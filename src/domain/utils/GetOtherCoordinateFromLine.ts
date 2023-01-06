import {Coordinate} from "../types/Coordinate"
import {Line} from "../types/Line"
import coordinatesAreEqual from "./CoordinatesAreEqual"

export default function getOtherCoordinateFromLine(line: Line, coordinate: Coordinate) {
	const results = line.filter(x => !coordinatesAreEqual(x, coordinate))
	if (results.length === 0) throw Error(`This line has two equal coordinates: ${JSON.stringify(coordinate)}`)
	if (results.length === 2) throw Error(`This line (${JSON.stringify(line)}) does not have coordinate ${JSON.stringify(coordinate)}`)
	return results[0]
}