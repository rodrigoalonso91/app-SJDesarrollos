import removeRedundantLines from "./RemoveRedundantLines"
import {Line} from "./types/Line"
import {Lines} from "./types/Lines"
import transformXmlToLines from "./TransformXmlToLines"
import linesTouch from "./utils/LinesTouch"

export default function transformXmlToNeighborhoods(xml: string) {
	const typedLines = transformXmlToLines(xml)
	const lines = removeRedundantLines(typedLines)
	console.log(JSON.stringify(lines))
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
				if (linesTouch(lineA, lineB)) {
					found = true
					return block.push(lineA)
				}
			})
			if (found) return
		})

		if (!found)
			blocks.push([lineA])
	})

	//console.log(blocks)

	const uroboroses = blocks.map(block => {
		const links = block.map(lineA => {

			const nexts = block.filter(lineB => linesTouch(lineA, lineB) && lineA !== lineB)
			if(nexts.length === 3) console.log(JSON.stringify(nexts))
			return {me: lineA, }
		})
		const uroboros = []


	})

	return blocks
}


