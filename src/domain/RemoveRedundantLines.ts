import {Line} from "./types/Line"
import {Lines} from "./types/Lines"
import coordinatesAreEqual from "./utils/CoordinatesAreEqual"
import linesAreEqual from "./utils/LinesAreEqual"

export default function removeRedundantLines(lines: Lines): Lines {
	const block = removeRedundant(removeGhostLines(lines.block))
	const lot = removeContainedInOtherList(removeRedundant(removeGhostLines(lines.lot)), block)
	return {block, lot}
}

const removeRedundant = (lines: Array<Line>): Array<Line> =>
	lines.reduce(removeRedundantLinesReducer, [] as Array<Line>)
const removeGhostLines = (lines: Array<Line>): Array<Line> =>
	lines.filter(line => !coordinatesAreEqual(line[0], line[1]))
const removeContainedInOtherList = (lines: Array<Line>, others: Array<Line>): Array<Line> =>
	lines.filter(line => others.every(other => !linesAreEqual(line, other)))

function removeRedundantLinesReducer(lines: Array<Line>, lineCandidate: Line): Array<Line> {
	return lines.some(line => linesAreEqual(lineCandidate, line)) ? lines : [...lines, lineCandidate]
}