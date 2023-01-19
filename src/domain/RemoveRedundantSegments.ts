import {Segment} from "./types/Segment"
import {CategorizedSegments} from "./types/CategorizedSegments"
import {coordinatesAreEqual} from "./utils/LineUtils"

export default function removeRedundantSegments(segments: CategorizedSegments): CategorizedSegments {
	const block = withoutRepeated(withoutZeroLengthSegments(segments.block))
	const lot = withoutContainedInOtherList(withoutRepeated(withoutZeroLengthSegments(segments.lot)), block)
	return {block, lot}
}

const withoutZeroLengthSegments = (segments: Array<Segment>): Array<Segment> =>
	segments.filter(segment => !coordinatesAreEqual(segment[0], segment[1]))

const withoutContainedInOtherList = (segments: Array<Segment>, others: Array<Segment>): Array<Segment> =>
	segments.filter(segment => others.every(other => !segmentsAreEqual(segment, other)))

const withoutRepeated = (segments: Array<Segment>): Array<Segment> =>
	segments.reduce(withoutRepeatedReducer, [] as Array<Segment>)

const withoutRepeatedReducer = (segments: Array<Segment>, candidate: Segment): Array<Segment> =>
	segments.some(segment => segmentsAreEqual(candidate, segment)) ? segments : [...segments, candidate]

const segmentsAreEqual = (segmentA: Segment, segmentB: Segment) =>
	segmentA.every(a => segmentB.some(b => coordinatesAreEqual(a, b)))