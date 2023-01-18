import {Coordinate} from "../types/Coordinate"
import {Line} from "../types/Line"
import {Segment} from "../types/Segment"

export function lineTouchesCoordinate(line: Line, coordinate: Coordinate) {
	return lineToSimpleLine(line).some(x => coordinatesAreEqual(x, coordinate))
}

export function linesTouch(lineA: Line, lineB: Line) {
	const simpleA = lineToSimpleLine(lineA)
	const simpleB = lineToSimpleLine(lineB)
	return simpleA.some(a => simpleB.some(b => coordinatesAreEqual(a, b)))
}

export function getOtherEnd(line: Segment, coordinate: Coordinate) {
	const results = line.filter(x => !coordinatesAreEqual(x, coordinate))
	if (results.length === 0) throw Error(`This line has two equal coordinates: ${JSON.stringify(coordinate)}`)
	if (results.length === 2) throw Error(`This line (${JSON.stringify(line)}) does not have coordinate ${JSON.stringify(coordinate)}`)
	return results[0]
}

export const coordinatesAreEqual = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y

export const first = <T>(array: Array<T>): T => array[0]

export const last = <T>(array: Array<T>): T => array[array.length - 1]

const lineToSimpleLine = (line: Line) => [first(line), last(line)]
