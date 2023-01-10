import {SimpleLine} from "./types/SimpleLine"
import {Lines} from "./types/Lines"
import {coordinatesAreEqual} from "./utils/LineUtils"

export default function removeRedundantLines(lines: Lines): Lines {
	const block = removeRedundant(removeGhostLines(lines.block))
	const lot = removeContainedInOtherList(removeRedundant(removeGhostLines(lines.lot)), block)
	return {block, lot}
}

const removeRedundant = (lines: Array<SimpleLine>): Array<SimpleLine> =>
	lines.reduce(removeRedundantLinesReducer, [] as Array<SimpleLine>)
const removeGhostLines = (lines: Array<SimpleLine>): Array<SimpleLine> =>
	lines.filter(line => !coordinatesAreEqual(line[0], line[1]))
const removeContainedInOtherList = (lines: Array<SimpleLine>, others: Array<SimpleLine>): Array<SimpleLine> =>
	lines.filter(line => others.every(other => !linesAreEqual(line, other)))

function removeRedundantLinesReducer(lines: Array<SimpleLine>, lineCandidate: SimpleLine): Array<SimpleLine> {
	return lines.some(line => linesAreEqual(lineCandidate, line)) ? lines : [...lines, lineCandidate]
}

const linesAreEqual = (lineA: SimpleLine, lineB: SimpleLine) =>
	lineA.every(a => lineB.some(b => coordinatesAreEqual(a, b)))