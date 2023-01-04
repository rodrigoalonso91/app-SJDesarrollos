import {Line} from "../types/Line"
import coordinatesAreEqual from "./CoordinatesAreEqual"

export default function linesAreEqual (lineA: Line, lineB: Line) {
	 return lineA.every(a => {
	 	console.log(JSON.stringify(a), lineB, lineB.some(b => coordinatesAreEqual(a, b)))
	  return lineB.some(b => coordinatesAreEqual(a, b))
	 })
}