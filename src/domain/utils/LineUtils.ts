import {Coordinate} from "../types/Coordinate"
import {Line} from "../types/Line"
import {Segment} from "../types/Segment"

export function lineTouchesCoordinate(line: Line, coordinate: Coordinate) {
	return lineToSimpleLine(line).some(x => coordinatesAreRoughlyEqual(x, coordinate))
}

export function linesTouchAtTheirEnds(lineA: Line, lineB: Line) {
	const simpleA = lineToSimpleLine(lineA)
	const simpleB = lineToSimpleLine(lineB)
	return simpleA.some(a => simpleB.some(b => coordinatesAreRoughlyEqual(a, b)))
}

export function getOtherEnd(segment: Segment, coordinate: Coordinate) {
	const results = segment.filter(x => !coordinatesAreRoughlyEqual(x, coordinate))
	if (results.length === 0) throw Error(`This line has two equal coordinates: ${JSON.stringify(coordinate)}`)
	if (results.length === 2) throw Error(`This line (${JSON.stringify(segment)}) does not have coordinate ${JSON.stringify(coordinate)}`)
	return results[0]
}

export const coordinatesAreRoughlyEqual = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	areRoughlyEqual(coordinateA.x, coordinateB.x) && areRoughlyEqual(coordinateA.y, coordinateB.y)

export const areRoughlyEqual = (a: number, b: number) => Math.abs(a-b) < 0.1

export const first = <T>(array: Array<T>): T => array[0]

export const last = <T>(array: Array<T>): T => array[array.length - 1]

const lineToSimpleLine = (line: Line): Segment => [first(line), last(line)]
