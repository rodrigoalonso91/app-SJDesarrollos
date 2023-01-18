import removeRedundantLines from "./RemoveRedundantLines"
import transformLinesToLotSides from "./TransformLinesToLotSides"
import transformToLots from "./TransformToLots"
import transformXmlToLines from "./TransformXmlToLines"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const lines = removeRedundantLines(raw)
	const sides = transformLinesToLotSides(lines)
	const transformed = transformToLots(sides)
	return transformed
}
