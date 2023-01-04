import {Line} from "./types/Line"
import {Lines} from "./types/Lines"
import {LineType} from "./types/LineType"
import {TypedLine} from "./types/TypedLine"
import coordinatesAreEqual from "./utils/CoordinatesAreEqual"
import linesAreEqual from "./utils/LinesAreEqual"

export default function removeRedundantLines(lines: Array<TypedLine>): Lines {
	lines = lines.filter(({line}) => !coordinatesAreEqual(line[0], line[1]))

	const block = lines
		.filter(x => x.type === LineType.Block)
		.map(x => x.line)
		.reduce(removeRedundantLinesReducer, [] as Array<Line>)

	const lot = lines
		.filter(x => x.type === LineType.Lot)
		.map(x => x.line)
		.filter(lot => block.every(block => !linesAreEqual(block, lot)))
		.reduce(removeRedundantLinesReducer, [] as Array<Line>)

	return {block, lot}
}

function removeRedundantLinesReducer(lines: Array<Line>, lineCandidate: Line): Array<Line> {
	return lines.some(line => linesAreEqual(lineCandidate, line)) ? lines : [...lines, lineCandidate]
}