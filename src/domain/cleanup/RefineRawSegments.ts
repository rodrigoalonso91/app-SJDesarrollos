import {CategorizedSegments} from "../types/CategorizedSegments"
import {linesTouchAtTheirEnds} from "../utils/LineUtils"
import removeRedundantSegments from "./RemoveRedundantSegments"
import removeZeroLengthSegments from "./RemoveZeroLengthSegments"
import splitIntersectingSegments from "./SplitIntersectingSegments"

export default function refineRawSegments(a0: CategorizedSegments) {
	const a1 = removeZeroLengthSegments(a0)
	const a2 = removeRedundantSegments(a1)

	return groupByBlock(a2)
		.map(splitIntersectingSegments)
		.map(removeZeroLengthSegments)
		.map(removeRedundantSegments)
}

function groupByBlock(segments: CategorizedSegments): Array<CategorizedSegments> {
	const results: Array<CategorizedSegments> = []
	let externals = [...segments.block]
	let internals = [...segments.lot]

	while (externals.length) {
		const result: CategorizedSegments = {block: [], lot: []}
		result.block.push(externals.shift()!)

		let i = 0
		while (i < result.block.length) {
			const current = result.block[i]

			const found_externals = externals.filter(segment => linesTouchAtTheirEnds(segment, current))
			externals = externals.filter(segment => !found_externals.includes(segment))
			result.block.push(...found_externals)

			const found_internals = internals.filter(segment => linesTouchAtTheirEnds(segment, current))
			internals = internals.filter(internals => !found_internals.includes(internals))
			result.lot.push(...found_internals)

			i++
		}

		i = 0
		while (i < result.lot.length) {
			const current = result.lot[i]

			const found_internals = internals.filter(segment => linesTouchAtTheirEnds(segment, current))
			internals = internals.filter(internals => !found_internals.includes(internals))
			result.lot.push(...found_internals)

			i++
		}

		results.push(result)
	}


	return results
}