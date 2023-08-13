import { Coordinate } from "@web/domain/types/Coordinate"
import { Line } from "@web/domain/types/Line"
import { Segment } from "@web/domain/types/Segment"

export function lineTouchesCoordinate(line: Line, coordinate: Coordinate) {
	return lineToSimpleLine(line).some((x) =>
		coordinatesAreRoughlyEqual(x, coordinate)
	)
}

export function linesTouchAtTheirEnds(lineA: Line, lineB: Line) {
	const simpleA = lineToSimpleLine(lineA)
	const simpleB = lineToSimpleLine(lineB)
	return simpleA.some((a) =>
		simpleB.some((b) => coordinatesAreRoughlyEqual(a, b))
	)
}

export function getOtherEnd(line: Line, coordinate: Coordinate) {
	if (coordinatesAreRoughlyEqual(first(line), coordinate)) return last(line)
	if (coordinatesAreRoughlyEqual(last(line), coordinate)) return first(line)
	throw Error(
		`This line (${JSON.stringify(
			line
		)}) does not have coordinate ${JSON.stringify(coordinate)}`
	)
}

export const coordinatesAreRoughlyEqual = (
	coordinateA: Coordinate,
	coordinateB: Coordinate
) =>
	areRoughlyEqual(coordinateA.x, coordinateB.x) &&
	areRoughlyEqual(coordinateA.y, coordinateB.y)

export const areRoughlyEqual = (a: number, b: number) => Math.abs(a - b) < 0.1

export const first = <T>(array: Array<T>): T => array[0]

export const last = <T>(array: Array<T>): T => array[array.length - 1]

const lineToSimpleLine = (line: Line): Segment => [first(line), last(line)]

export function lineToSegments(line: Line): Array<Segment> {
	const segments: Array<Segment> = []
	for (let i = 0; i < line.length - 1; i++)
		segments.push([line[i], line[i + 1]])
	return segments
}