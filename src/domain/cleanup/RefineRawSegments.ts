import removeRedundantSegments from "./RemoveRedundantSegments"
import removeZeroLengthSegments from "./RemoveZeroLengthSegments"
import splitIntersectingSegments from "./SplitIntersectingSegments"
import {CategorizedSegments} from "../types/CategorizedSegments"

export default function refineRawSegments(a0: CategorizedSegments) {
	const a1 = removeZeroLengthSegments(a0)
	const a2 = removeRedundantSegments(a1)

	const a3 = splitIntersectingSegments(a2)
	const a4 = removeZeroLengthSegments(a3)
	return removeRedundantSegments(a4)
}