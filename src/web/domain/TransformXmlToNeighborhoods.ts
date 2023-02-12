import refineRawSegments from "@web/domain/cleanup/RefineRawSegments"
import transformBlockSidesToLots from "@web/domain/TransformBlockSidesToLots"
import transformSegmentsToLotSides from "@web/domain/TransformSegmentsToLotSides"
import transformXmlToLines from "@web/domain/TransformXmlToLines"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const segments = refineRawSegments(raw)
	const results = segments.map(transformSegmentsToLotSides)
	const errors = results
		.filter((x) => x.error)
		.map((x) => ({
			lines: [...x.segments.internals, ...x.segments.externals],
			error: x.error,
			faulty: x.faulty
		}))
	const sides = results.filter((x) => x.error === null).map((x) => x.segments)
	const lots = sides.map(transformBlockSidesToLots)
	return { lots, errors }
}
