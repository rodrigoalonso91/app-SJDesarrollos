import removeRedundantSegments from "./RemoveRedundantSegments"
import transformSegmentsToLotSides from "./TransformSegmentsToLotSides"
import transformSidesToLots from "./TransformSidesToLots"
import transformXmlToLines from "./TransformXmlToLines"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const segments = removeRedundantSegments(raw)
	const sides = transformSegmentsToLotSides(segments)
	const lots = transformSidesToLots(sides)
	return lots
}
