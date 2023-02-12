import splitSegmentOnIntersections from "./SplitSegmentOnIntersections"
import {CategorizedSegments} from "../types/CategorizedSegments"
import {Segment} from "../types/Segment"

export default function splitIntersectingSegments(segments: CategorizedSegments): CategorizedSegments {
	const splitters = [...segments.internals, ...segments.externals]
	const split = (segment: Segment) => splitSegmentOnIntersections(segment, splitters)
	const block = segments.externals.flatMap(split)
	const lot = segments.internals.flatMap(split)
	return {externals: block, internals: lot}
}
