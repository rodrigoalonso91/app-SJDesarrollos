import removeRedundantLines from "./RemoveRedundantLines"
import transformToLongLines from "./TransformToLongLines"
import transformXmlToLines from "./TransformXmlToLines"
import transformLinesToBlockPerimeters from "./TransformLinesToBlockPerimeters"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const lines = removeRedundantLines(raw)
	const perimeters = transformLinesToBlockPerimeters(lines.block)
	const transformed = transformToLongLines(perimeters, lines.lot)
	return transformed
}
