import splitSegmentOnIntersections from "@web/domain/cleanup/SplitSegmentOnIntersections"
import { CategorizedSegments } from "@web/domain/types/CategorizedSegments"
import { Segment } from "@web/domain/types/Segment"

export default function splitIntersectingSegments(
	segments: CategorizedSegments
): CategorizedSegments {
	const splitters = [...segments.internals, ...segments.externals]
	const split = (segment: Segment) =>
		splitSegmentOnIntersections(segment, splitters)
	const block = segments.externals.flatMap(split)
	const lot = segments.internals.flatMap(split)
	return { externals: block, internals: lot }
}
