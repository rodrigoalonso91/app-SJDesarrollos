import {Coordinate} from "../types/Coordinate"
import {Line} from "../types/Line"
import coordinatesAreEqual from "./CoordinatesAreEqual"

export default function lineTouchesCoordinate(line: Line, coordinate: Coordinate) {
	return line.some(x => coordinatesAreEqual(x, coordinate))
}