import {Coordinate} from "./Coordinate"
import { Line } from "./Line"

export default function transformXmlToNeighborhoods(xml: string) {
	const lines = transformXmlToLines(xml)
	//const blockLines = transformLinesToBlockLines(lines)
	return lines
}

//TODO maybe check for lines that have same origin as destination
const linesAreEqual = (lineA: Line, lineB: Line) => lineA.every(a => lineB.some(b => coordinatesAreEqual(a, b)))
const coordinatesAreEqual = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y