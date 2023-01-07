import {Line} from "../types/Line"
import coordinatesAreEqual from "./CoordinatesAreEqual"

export default function linesAreEqual (lineA: Line, lineB: Line) {
	 return lineA.every(a => lineB.some(b => coordinatesAreEqual(a, b)))
}