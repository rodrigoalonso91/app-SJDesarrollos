import {Line} from "../types/Line"
import coordinatesAreEqual from "./CoordinatesAreEqual"

export default function linesTouch(lineA: Line, lineB: Line) {
	return lineA.some(a => lineB.some(b => coordinatesAreEqual(a, b)))
}