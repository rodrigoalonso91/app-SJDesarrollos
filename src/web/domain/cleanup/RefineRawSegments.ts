import {CategorizedSegments} from "../types/CategorizedSegments"
import groupByBlock from "./GroupByBlock"
import removeExtraSegments from "./RemoveExtraSegments"
import splitIntersectingSegments from "./SplitIntersectingSegments"

export default function refineRawSegments(segments: CategorizedSegments) {
	const cleaned = removeExtraSegments(segments)
	return groupByBlock(cleaned)
		.map(splitIntersectingSegments)
		.map(removeExtraSegments)
}