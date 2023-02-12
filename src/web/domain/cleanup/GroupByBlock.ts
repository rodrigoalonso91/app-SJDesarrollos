import { CategorizedSegments } from "@web/domain/types/CategorizedSegments"
import { linesTouchAtTheirEnds } from "@web/domain/utils/LineUtils"

export default function groupByBlock(
	segments: CategorizedSegments
): Array<CategorizedSegments> {
	const results: Array<CategorizedSegments> = []
	let externals = [...segments.externals]
	let internals = [...segments.internals]

	while (externals.length) {
		const result: CategorizedSegments = { externals: [], internals: [] }
		result.externals.push(externals.shift()!)

		let i = 0
		while (i < result.externals.length) {
			const current = result.externals[i]

			const found_externals = externals.filter((segment) =>
				linesTouchAtTheirEnds(segment, current)
			)
			externals = externals.filter(
				(segment) => !found_externals.includes(segment)
			)
			result.externals.push(...found_externals)

			const found_internals = internals.filter((segment) =>
				linesTouchAtTheirEnds(segment, current)
			)
			internals = internals.filter(
				(internals) => !found_internals.includes(internals)
			)
			result.internals.push(...found_internals)

			i++
		}

		i = 0
		while (i < result.internals.length) {
			const current = result.internals[i]

			const found_internals = internals.filter((segment) =>
				linesTouchAtTheirEnds(segment, current)
			)
			internals = internals.filter(
				(internals) => !found_internals.includes(internals)
			)
			result.internals.push(...found_internals)

			i++
		}

		results.push(result)
	}

	return results
}
