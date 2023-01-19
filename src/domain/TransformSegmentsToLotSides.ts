import {Line} from "./types/Line"
import {CategorizedSegments} from "./types/CategorizedSegments"
import {Perimeter} from "./types/Perimeter"
import {Segment} from "./types/Segment"
import {coordinatesAreEqual, first, getOtherEnd, last, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformSegmentsToLotSides(segments: CategorizedSegments) {
	const blocks = transformSegmentsToBlocks(segments.block)
	const externals = transformToLotExternalSides(blocks, segments.lot)
	return transformToLotSides(externals, [...segments.lot])
}

function transformSegmentsToBlocks(segments: Array<Segment>) {
	const perimeters: Array<Perimeter> = []
	segments = [...segments]
	while (segments.length > 0) {
		const [first, second] = segments.pop()!
		const perimeter = [first, second]

		while (true) {
			const last = perimeter[perimeter.length - 1]
			const touching = segments.filter(segment => lineTouchesCoordinate(segment, last))
			if (touching.length > 1) throw Error(`found more than one touching border: ${JSON.stringify(touching)}`)
			if (touching.length === 0) throw Error(`perimeter could not be completed due to lack of lines`)
			const segment = touching[0]
			segments = segments.filter(x => x !== segment)
			const next = getOtherEnd(segment, last)
			if (coordinatesAreEqual(next, first)) break
			else perimeter.push(next)
		}

		perimeters.push(perimeter)
	}

	return perimeters
}

function transformToLotExternalSides(perimeters: Array<Perimeter>, inners: Array<Segment>) {
	const results: Array<Lines> = []
	for (const perimeter of perimeters) {
		const firsts: Line = []
		let current: Line = firsts
		const longs = []
		for (let i = 0; i < perimeter.length; i++) {
			const coordinate = perimeter[i]
			const touching = inners.filter(line => lineTouchesCoordinate(line, coordinate))

			if (touching.length > 1) throw Error(`found more than one lot line touching a block perimeter coordinate: ${JSON.stringify(touching)}`)

			current.push(coordinate)
			if (touching.length === 0) continue
			current = [coordinate]
			longs.push(current)
		}

		const lasts = longs[longs.length - 1]
		longs[longs.length - 1] = [...lasts, ...firsts]
		results.push(longs)
	}
	return results
}

function transformToLotSides(perimeters: Array<Array<Line>>, simples: Array<Segment>) {
	return perimeters.map(perimeter => {
		const origins = perimeter.map(line => first(line))

		const longs: Array<Line> = []
		while (origins.length > 0) {
			const origin = origins.shift()!
			if(longs.some(long => lineTouchesCoordinate(long, origin))) continue
			longs.push(...xuxa({line: [origin], simples}))
		}

		return {perimeter, longs: longs.filter(x => x.length > 1)}
	})
}

function xuxa({line, simples}: { line: Line, simples: Array<Segment>}): Array<Line> {
	const current = last(line)
	const found = simples.filter(simple => lineTouchesCoordinate(simple, current))

	if (found.length === 0) return [line]
	const remaining = simples.filter(simple => !found.includes(simple))

	if (found.length === 1) return xuxa({line: [...line, getOtherEnd(found[0], current)], simples: remaining})

		const additions = found.map(line => getOtherEnd(line, current))

		return [
			line,
			...additions.flatMap(addition => xuxa({line: [current, addition], simples: remaining}))
		]
}

type Lines = Array<Line>
