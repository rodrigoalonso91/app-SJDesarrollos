import {Line} from "./types/Line"
import {Lines} from "./types/Lines"
import {LineType} from "./types/LineType"
import {TypedLine} from "./types/TypedLine"
import linesAreEqual from "./utils/LinesAreEqual"

//TODO maybe check for lines that have same origin as destination
export default function removeRedundantLines(lines: Array<TypedLine>): Lines {
	const block = lines
		.filter(x => x.type === LineType.Block)
		.map(x => x.line)
		.reduce((lines, lineCandidate) =>
				lines.every(line => !linesAreEqual(lineCandidate, line)) ? [...lines, lineCandidate] : lines
			, [] as Array<Line>)
	const lot = lines
		.filter(x => x.type === LineType.Lot)
		.map(x => x.line)
		.filter(lot => block.every(block => !linesAreEqual(block, lot)))
		.reduce((lines, lineCandidate) =>
				lines.every(line => !linesAreEqual(lineCandidate, line)) ? [...lines, lineCandidate] : lines
			, [] as Array<Line>)
	return {block, lot}
}