import {CategorizedSegments} from "./types/CategorizedSegments"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {Segment} from "./types/Segment"
import {coordinatesAreRoughlyEqual, first, getOtherEnd, last, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformSegmentsToLotSides(segments: CategorizedSegments) {
	try {
		const blocks = transformExternalsToBlocks(segments.externals)
		const externals = transformToLotExternalSides(blocks, segments.internals)
		const results = transformToLotSides(externals, [...segments.internals])
		return {error: null, segments: results}
	} catch (e: any) {
		if (e instanceof MasterBuildingError)
			return {error: e.message, segments: segments, faulty: e.errors}

		if (e instanceof Error)
			return {error: e.message, segments: segments, faulty: []}

		throw e
	}
}

function transformExternalsToBlocks(externals: Array<Segment>): Array<Coordinate> {
	externals = [...externals]
	const [first, second] = externals.pop()!
	const perimeter = [first, second]

	while (true) {
		const last = perimeter[perimeter.length - 1]
		const touching = externals.filter(segment => lineTouchesCoordinate(segment, last))
		if (touching.length > 1) throw new MasterBuildingError(`block border has more than 2 lines touching.`, [...touching, [penultimate(perimeter), last]])
		if (touching.length === 0) throw new MasterBuildingError(`block did not close`, [[first, last]])
		const segment = touching[0]
		externals = externals.filter(x => x !== segment)
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

		//TODO need to contemplate 2 lines touching border
		if (touching.length > 1) throw new MasterBuildingError(`found more than one lot line touching a block perimeter coordinate.`, touching)

		current.push(coordinate)
		if (touching.length === 0) continue
		current = [coordinate]
		longs.push(current)
	}

	// This contemplates blocks that only have one lot, which is itself.
	if (longs.length === 0) return [externals]

	const lasts = last(longs)
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

class MasterBuildingError extends Error {
	errors: Array<Segment>

	constructor(message: string, errors: Array<Segment>) {
		super(message)
		this.errors = errors
	}
}

export const penultimate = <T>(array: Array<T>): T => array[array.length - 2]