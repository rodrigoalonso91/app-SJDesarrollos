import { Line } from "@web/domain/types/Line"
import {
	coordinatesAreRoughlyEqual,
	first,
	getOtherEnd,
	last,
	linesTouchAtTheirEnds,
	lineTouchesCoordinate
} from "@web/domain/utils/LineUtils"
import { Coordinate } from "@web/domain/types/Coordinate"

export default function transformBlockSidesToLots({
	externals,
	internals
}: {
	externals: Array<Line>
	internals: Array<Line>
}): Array<Array<Coordinate>> {
	if (externals.length === 1) return [externals[0]]
	return transformToLotSides({ externals, internals }).map(linesToShape)
}

function getLotSides(
	path: Array<Line>,
	destination: Coordinate,
	options: Array<Line>
): Array<Line> | null {
	const current = last(path)
	options = options.filter((x) => current !== x)

	if (lineTouchesCoordinate(current, destination)) return path
	const touching = options.filter((x) => linesTouchAtTheirEnds(current, x))
	const remaining = options.filter((x) => !touching.includes(x))
	for (const line of touching) {
		const result = getLotSides([...path, line], destination, remaining)
		if (result !== null) return result
	}
	return null
}

function transformToLotSides(block: {
	externals: Array<Line>
	internals: Array<Line>
}) {
	const externals = [...block.externals]
	const results: Array<Array<Line>> = []
	let unused: Array<Line> = []

	while (externals.length > 0) {
		const internals = [...block.internals]
		const current = externals.shift()!
		const start = internals.find((x) =>
			lineTouchesCoordinate(x, first(current))
		)!

		const result = getLotSides([current, start], last(current), internals)

		if (result === null) unused.push(current)
		else results.push(result)
	}

	while (unused.length > 0) {
		const internals = [...block.internals]
		const current = unused.shift()!

		const allowed = unused.filter(
			(line) => !linesTouchAtTheirEnds(line, current)
		)

		let found = false
		for (const other of allowed) {
			const sideA = getLotSides([current], first(other), internals)
			if (sideA === null) continue
			const sideB = getLotSides([current], last(other), internals)
			if (sideB === null) continue
			unused = unused.filter((x) => x !== other)
			//since sideA and sideB each include current but exclude other, we remove current from one of them
			results.push([
				linesToLine(sideA),
				other,
				linesToLine(sideB.filter((x) => x !== current))
			])
			found = true
			break
		}

		if (!found) throw `External line not matching ${JSON.stringify(current)}`
	}

	return results
}

function linesToShape(lines: Array<Line>) {
	const results = linesToLine(lines)
	if (coordinatesAreRoughlyEqual(first(results), last(results)))
		return results.slice(1)
	throw Error(`Shape does not close itself ${JSON.stringify(lines)}`)
}

function linesToLine(lines: Array<Line>) {
	if (lines.length === 1) return lines[0]
	const second = getCommonCoordinate(lines[0], lines[1])
	const origin = getOtherEnd(lines[0], second)
	return lines.reduce(
		(results, line) => {
			if (coordinatesAreRoughlyEqual(last(results), first(line)))
				return [...results, ...line.slice(1)]
			if (coordinatesAreRoughlyEqual(last(results), last(line)))
				return [...results, ...[...line].reverse().slice(1)]
			throw Error(
				`Line (${JSON.stringify(
					line
				)}) does not touch adjacent lines (${JSON.stringify(lines)})`
			)
		},
		[origin]
	)
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
	throw Error(
		`First and Second lines do not touch: ${JSON.stringify([lineA, lineB])}`
	)
}
