import {CategorizedSegments} from "./types/CategorizedSegments"
import {Coordinate} from "./types/Coordinate"
import {Segment} from "./types/Segment"
import {areRoughlyEqual, linesTouchAtTheirEnds} from "./utils/LineUtils"

export default function splitIntersectingSegments(segments: CategorizedSegments): CategorizedSegments {
	const all = [...segments.lot, ...segments.block]
	const block = segments.block.flatMap(segment => {
		const pieces = all.flatMap(sample => intersect(segment, sample))
		return (pieces.length > 0 ? pieces : [segment]) as Array<Segment>
	})
	const lot = segments.lot.flatMap(segment => {
		const pieces = all.flatMap(sample => intersect(segment, sample))
		return (pieces.length > 0 ? pieces : [segment]) as Array<Segment>
	})
	return {block, lot}
}

const intersect = (segment: Segment, sample: Segment) => {
	const segmentProperties = getLineProperties(segment)
	const sampleProperties = getLineProperties(sample)
	if (areRoughlyEqual(segmentProperties.slope, sampleProperties.slope)) {

		if (!areRoughlyEqual(segmentProperties.offset, sampleProperties.offset)) return []

		const inners = sample.filter(coordinate => isInnerCoordinate(segment, coordinate))
		if (inners.length === 0) return []
		if (inners.length === 2) return [
			[segment[0], closerTo(segment[0], inners)],
			[inners[0], inners[1]],
			[segment[1], closerTo(segment[1], inners)],
		]
		return [[segment[0], inners[0]], [segment[1], inners[0]]]
	} else {
		if (linesTouchAtTheirEnds(segment, sample)) return []
		return [

		] //TODO missing all this part
	}
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
	return minX < x && x < maxX && minY < y && y < maxY
}

const closerTo = (coordinate: Coordinate, coordinates: Array<Coordinate>) => {
	const distanceA = distance(coordinate, coordinates[0])
	const distanceB = distance(coordinate, coordinates[1])
	return distanceA < distanceB ? coordinates[0] : coordinates[1]
}

const distance = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	Math.sqrt(Math.pow(coordinateA.y - coordinateB.y, 2) + Math.pow(coordinateA.x - coordinateB.x, 2))

