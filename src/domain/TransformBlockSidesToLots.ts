import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {coordinatesAreRoughlyEqual, first, last, linesTouchAtTheirEnds, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformBlockSidesToLots({externals, internals}: {externals: Array<Line>, internals: Array<Line>}): Array<Array<Coordinate>> {
	if (externals.length === 1) return [linesToShape(externals)]
	return transformToLotSides({externals, internals}).map(linesToShape)
}


function getLotSides(path: Array<Line>, destination: Coordinate, options: Array<Line>): Array<Line> | null {
	const current = last(path)
	options = options.filter(x => current !== x)

	if (lineTouchesCoordinate(current, destination)) return path
	const touching = options.filter(x => linesTouchAtTheirEnds(current, x))
	const remaining = options.filter(x => !touching.includes(x))
	for (const line of touching) {
		const result = getLotSides([...path, line], destination, remaining)
		if (result !== null) return result
	}
	return null
}

function transformToLotSides(block: { externals: Array<Line>, internals: Array<Line> }) {
	const externals = [...block.externals]
	const results: Array<Array<Line>> = []
	while (externals.length > 0) {
		const internals = [...block.internals]
		const external = externals.shift()!
		const start = internals.find(x => lineTouchesCoordinate(x, first(external)))!

		const result = getLotSides([external, start], last(external), internals)
		if (result === null) continue
		results.push(result)
	}
	return results
}

function linesToShape(lines: Array<Line>) {
	const origin = getCommonCoordinate(first(lines), last(lines))
	const results = lines.reduce((results, line) => {
	console.log(line)
		 if(coordinatesAreRoughlyEqual(last(results), first(line))) return [...results, ...line.slice(1)]
		 if(coordinatesAreRoughlyEqual(last(results), last(line))) return [...results, ...[...line].reverse().slice(1)]
		 throw Error(`Line (${JSON.stringify(line)}) does not touch adjacent lines (${JSON.stringify(lines)})`)
	}, [origin])
	if (lines.length === 1) return results
	return results.slice(1)
}

function getCommonCoordinate(lineA: Line, lineB: Line) {
	const a0 = first(lineA)
	const a1 = last(lineA)
	const b0 = first(lineB)
	const b1 = last(lineB)
	if (coordinatesAreRoughlyEqual(a0, b0)) return a0
	if (coordinatesAreRoughlyEqual(a0, b1)) return a0
	if (coordinatesAreRoughlyEqual(a1, b0)) return a1
	if (coordinatesAreRoughlyEqual(a1, b1)) return a1
	throw Error(`First and Last coordinate do not touch: ${JSON.stringify([lineA, lineB])}`)
}