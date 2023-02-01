import refineRawSegments from "./cleanup/RefineRawSegments"
import transformBlockSidesToLots from "./TransformBlockSidesToLots"
import transformSegmentsToLotSides from "./TransformSegmentsToLotSides"
import transformXmlToLines from "./TransformXmlToLines"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const segments = refineRawSegments(raw)
	const results = segments.map(transformSegmentsToLotSides)
	const errors = results.filter(x => x.error).map(x => [...x.segments.internals, ...x.segments.externals])
	const sides = results.filter(x => !x.error).map(x => x.segments)
	const lots = sides.map(transformBlockSidesToLots)
	return {lots, errors}
}
