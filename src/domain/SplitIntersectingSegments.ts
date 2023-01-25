import splitSegmentOnIntersections from "./SplitSegmentOnIntersections"
import {CategorizedSegments} from "./types/CategorizedSegments"
import {Segment} from "./types/Segment"

export default function splitIntersectingSegments(segments: CategorizedSegments): CategorizedSegments {
	const splitters = [...segments.lot, ...segments.block]
	const split = (segment: Segment) => splitSegmentOnIntersections(segment, splitters)
	const block = segments.block.flatMap(split)
	const lot = segments.lot.flatMap(split)
	return {block, lot}
}
