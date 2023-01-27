import refineRawSegments from "./cleanup/RefineRawSegments"
import transformBlockSidesToLots from "./TransformBlockSidesToLots"
import transformSegmentsToLotSides from "./TransformSegmentsToLotSides"
import transformXmlToLines from "./TransformXmlToLines"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const segments = refineRawSegments(raw)
	const sides = segments.map(transformSegmentsToLotSides)
	const lots = sides.map(transformBlockSidesToLots)
	return lots
}
