import {Coordinate} from "../types/Coordinate"

export default function coordinatesAreEqual(coordinateA: Coordinate, coordinateB: Coordinate) {
	return coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y
}