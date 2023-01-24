import removeRedundantSegments from "./RemoveRedundantSegments"
import splitIntersectingSegments from "./SplitIntersectingSegments"
import {CategorizedSegments} from "./types/CategorizedSegments"

export default function refineRawSegments(raw: CategorizedSegments) {
	const simplified = removeRedundantSegments(raw)
	const split = splitIntersectingSegments(simplified)
	return removeRedundantSegments(split)
}