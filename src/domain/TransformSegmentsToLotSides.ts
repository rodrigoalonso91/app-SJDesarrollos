import {CategorizedSegments} from "./types/CategorizedSegments"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {Segment} from "./types/Segment"
import {coordinatesAreRoughlyEqual, first, getOtherEnd, last, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformSegmentsToLotSides(segments: CategorizedSegments) {
	const blocks = transformSegmentsToBlocks(segments.externals)
	const externals = transformToLotExternalSides(blocks, segments.internals)
	return transformToLotSides(externals, [...segments.internals])
}

//TODO can have errors
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

//TODO can have errors
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
		internals.push(...getLotSides({line: [origin], internals: simples}))
	}

	return {externals, internals: internals.filter(x => x.length > 1)}
}

function getLotSides({line, internals}: { line: Line, internals: Array<Segment> }): Array<Line> {
	const current = last(line)
	const found = internals.filter(internal => lineTouchesCoordinate(internal, current))

	if (found.length === 0) return [line]
	const remaining = internals.filter(internal => !found.includes(internal))

	if (found.length === 1) return getLotSides({line: [...line, getOtherEnd(found[0], current)], internals: remaining})

	const additions = found.map(line => getOtherEnd(line, current))

	return [
		line,
		...additions.flatMap(addition => getLotSides({line: [current, addition], internals: remaining}))
	]
}
