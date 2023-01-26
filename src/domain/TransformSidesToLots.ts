import transformBlockSidesToLots from "./TransformBlockSidesToLots"
import transformSegmentsToLotSides from "./TransformSegmentsToLotSides"

export default function transformSidesToLots(sides: ReturnType<typeof transformSegmentsToLotSides>) {
	return sides.map(transformBlockSidesToLots)
}
