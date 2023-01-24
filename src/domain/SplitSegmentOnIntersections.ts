import {Coordinate} from "./types/Coordinate"
import {Segment} from "./types/Segment"
import {areRoughlyEqual} from "./utils/LineUtils"

export default function splitSegmentOnIntersections(segment: Segment, splitters: Array<Segment>): Array<Segment> {

	for (const splitter of splitters) {
		const segmentProperties = getLineProperties(segment)
		const sampleProperties = getLineProperties(splitter)
		console.log(segmentProperties, sampleProperties)
		if (areRoughlyEqual(segmentProperties.slope, sampleProperties.slope)) {
			const inners = splitter
				.filter(coordinate => !segmentContainsCoordinate(segment, coordinate))
				.filter(coordinate => isInnerCoordinate(segment, coordinate))
			console.log(inners, segment, splitter)

			if (inners.length === 1)
				return [
					[segment[0], inners[0]],
					[segment[1], inners[0]]
				]
			if (inners.length === 2)
				return [
					[segment[0], closerTo(segment[0], inners)],
					[inners[0], inners[1]],
					[segment[1], closerTo(segment[1], inners)]
				]
		} else {

		}
	}
	return [segment]
}

//TODO run all checks at once so that there are no bigger lines created than needed

const getSlope = (segment: Segment) => (segment[0].y - segment[1].y) / (segment[0].x - segment[1].x)
const getOffset = ({x, y}: Coordinate, slope: number) => y - slope * x
const getLineProperties = (segment: Segment) => {
	const slope = getSlope(segment)
	const offset = getOffset(segment[0], slope)
	return {slope, offset}
}

const isInnerCoordinate = (segment: Segment, {x, y}: Coordinate) => {
	const [minX, maxX] = segment.map(coordinate => coordinate.x).sort()
	const [minY, maxY] = segment.map(coordinate => coordinate.y).sort()
	console.log(minX, maxX, minY, maxY, x, y)
	return minX <= x && x <= maxX && minY <= y && y <= maxY
}

const closerTo = (coordinate: Coordinate, coordinates: Array<Coordinate>) => {
	const distanceA = distance(coordinate, coordinates[0])
	const distanceB = distance(coordinate, coordinates[1])
	return distanceA < distanceB ? coordinates[0] : coordinates[1]
}

const distance = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	Math.sqrt(Math.pow(coordinateA.y - coordinateB.y, 2) + Math.pow(coordinateA.x - coordinateB.x, 2))

const coordinatesAreEqual = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y

const segmentContainsCoordinate = (segment: Segment, coordinate: Coordinate) =>
	segment.some(end => coordinatesAreEqual(end, coordinate))