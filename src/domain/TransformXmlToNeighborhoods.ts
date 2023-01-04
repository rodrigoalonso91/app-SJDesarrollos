import removeRedundantLines from "./RemoveRedundantLines"
import {Line} from "./types/Line"
import {Lines} from "./types/Lines"
import transformXmlToLines from "./TransformXmlToLines"
import linesTouch from "./utils/LinesTouch"

export default function transformXmlToNeighborhoods(xml: string) {
	const typedLines = transformXmlToLines(xml)
	const lines = removeRedundantLines(typedLines)
	const blockLines = transformLinesToBlockLines(lines)
	return blockLines
}

function transformLinesToBlockLines(lines: Lines) {
	let blocks: Array<Array<Line>> = []
	lines.block.forEach(lineA => {
		let found = false

		//TODO missing logic for mixing 2 blocks when found to be the same.
		blocks.forEach(block => {
			block.forEach(lineB => {
				if (linesTouch(lineA, lineB))
					return block.push(lineA)
			})
		})

		if (!found)
			blocks.push([lineA])
	})

	console.log(blocks)

	const uroboroses = blocks.map(block => {
		const links = block.map(lineA => {

			const nexts = block.filter(lineB => linesTouch(lineA, lineB))
			console.log(nexts.length)
			return {me: lineA}
		})
		const uroboros = []


	})

	return blocks
}


