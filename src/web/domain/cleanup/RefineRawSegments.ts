import groupByBlock from "@web/domain/cleanup/GroupByBlock"
import removeExtraSegments from "@web/domain/cleanup/RemoveExtraSegments"
import splitIntersectingSegments from "@web/domain/cleanup/SplitIntersectingSegments"
import { CategorizedSegments } from "@web/domain/types/CategorizedSegments"

export default function refineRawSegments(segments: CategorizedSegments) {
	const cleaned = removeExtraSegments(segments)
	const split = splitIntersectingSegments(cleaned)
	return groupByBlock(split)
		.map(splitIntersectingSegments)
		.map(removeExtraSegments)
}
