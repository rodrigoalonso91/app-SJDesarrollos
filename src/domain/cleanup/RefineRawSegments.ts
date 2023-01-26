import removeRedundantSegments from "./RemoveRedundantSegments"
import removeZeroLengthSegments from "./RemoveZeroLengthSegments"
import splitIntersectingSegments from "./SplitIntersectingSegments"
import {CategorizedSegments} from "../types/CategorizedSegments"

export default function refineRawSegments(raw: CategorizedSegments) {
	const segments = removeZeroLengthSegments(raw)
	const simplified = removeRedundantSegments(segments)

	const split = splitIntersectingSegments(simplified)
	return removeRedundantSegments(split)
}