import {Segment} from "../types/Segment"
import {coordinatesAreRoughlyEqual} from "../utils/LineUtils"
import {CategorizedSegments} from "../types/CategorizedSegments"

export default function removeZeroLengthSegments(raw: CategorizedSegments) {
	const block = withoutZeroLengthSegments(raw.block)
	const lot = withoutZeroLengthSegments(raw.lot)
	return {block, lot}
}

const withoutZeroLengthSegments = (segments: Array<Segment>): Array<Segment> =>
	segments.filter(segment => !coordinatesAreRoughlyEqual(segment[0], segment[1]))