import {CategorizedSegments} from "./types/CategorizedSegments"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {Segment} from "./types/Segment"
import {coordinatesAreRoughlyEqual, first, getOtherEnd, last, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformSegmentsToLotSides(segments: CategorizedSegments) {
	const blocks = transformSegmentsToBlocks(segments.block)
	const externals = transformToLotExternalSides(blocks, segments.lot)
	return transformToLotSides(externals, [...segments.lot])
}

function transformSegmentsToBlocks(segments: Array<Segment>): Array<Coordinate> {
	segments = [...segments]
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

		//TODO there should be no extra lines
		if (coordinatesAreRoughlyEqual(next, first)) return perimeter
		else perimeter.push(next)
	}
}

function transformToLotExternalSides(externals: Array<Coordinate>, inners: Array<Segment>): Array<Line> {
		const firsts: Line = []
		let current: Line = firsts
		const longs = []
		for (let i = 0; i < externals.length; i++) {
			const coordinate = externals[i]
			const touching = inners.filter(line => lineTouchesCoordinate(line, coordinate))

			if (touching.length > 1) throw Error(`found more than one lot line touching a block perimeter coordinate: ${JSON.stringify(touching)}`)

			current.push(coordinate)
			if (touching.length === 0) continue
			current = [coordinate]
			longs.push(current)
		}

		const lasts = longs[longs.length - 1]
		longs[longs.length - 1] = [...lasts, ...firsts]
		return longs
}

function transformToLotSides(externals: Array<Line>, simples: Array<Segment>) {
	const origins = externals.map(line => first(line))

	const internals: Array<Line> = []
	while (origins.length > 0) {
		const origin = origins.shift()!
		if (internals.some(long => lineTouchesCoordinate(long, origin))) continue
		internals.push(...xuxa({line: [origin], simples}))
	}

	return {externals, internals: internals.filter(x => x.length > 1)}
}

//TODO rename
function xuxa({line, simples}: { line: Line, simples: Array<Segment> }): Array<Line> {
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
