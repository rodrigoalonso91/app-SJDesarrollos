import {CategorizedSegments} from "../types/CategorizedSegments"
import {Segment} from "../types/Segment"
import {coordinatesAreRoughlyEqual} from "../utils/LineUtils"

export default function removeExtraSegments(segments: CategorizedSegments): CategorizedSegments {
	const externals = withoutRepeated(segments.externals.filter(excludeZeroLengthSegments))
	const excludeContainedInExternals = (segment: Segment) => excludeContainedInList(segment, externals)
	const internals = withoutRepeated(segments.internals.filter(excludeZeroLengthSegments)).filter(excludeContainedInExternals)
	return {externals, internals}
}

const excludeContainedInList = (segment: Segment, list: Array<Segment>) =>
	list.every(other => !segmentsAreEqual(segment, other))

const excludeZeroLengthSegments = (segment: Segment): boolean =>
	!coordinatesAreRoughlyEqual(segment[0], segment[1])

const withoutRepeated = (segments: Array<Segment>): Array<Segment> =>
	segments.reduce(withoutRepeatedReducer, [] as Array<Segment>)

const withoutRepeatedReducer = (segments: Array<Segment>, candidate: Segment): Array<Segment> =>
	segments.some(segment => segmentsAreEqual(candidate, segment)) ? segments : [...segments, candidate]

const segmentsAreEqual = (segmentA: Segment, segmentB: Segment) =>
	segmentA.every(a => segmentB.some(b => coordinatesAreRoughlyEqual(a, b)))