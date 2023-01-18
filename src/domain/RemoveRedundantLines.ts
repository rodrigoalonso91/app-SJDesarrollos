import {Segment} from "./types/Segment"
import {CategorizedSegments} from "./types/CategorizedSegments"
import {coordinatesAreEqual} from "./utils/LineUtils"

export default function removeRedundantLines(lines: CategorizedSegments): CategorizedSegments {
	const block = withoutRepeated(withoutZeroLengthLines(lines.block))
	const lot = withoutContainedInOtherList(withoutRepeated(withoutZeroLengthLines(lines.lot)), block)
	return {block, lot}
}

const withoutRepeated = (lines: Array<Segment>): Array<Segment> =>
	lines.reduce(removeRedundantLinesReducer, [] as Array<Segment>)

const withoutZeroLengthLines = (lines: Array<Segment>): Array<Segment> =>
	lines.filter(line => !coordinatesAreEqual(line[0], line[1]))

const withoutContainedInOtherList = (lines: Array<Segment>, others: Array<Segment>): Array<Segment> =>
	lines.filter(line => others.every(other => !linesAreEqual(line, other)))

const removeRedundantLinesReducer = (lines: Array<Segment>, lineCandidate: Segment): Array<Segment> =>
	lines.some(line => linesAreEqual(lineCandidate, line)) ? lines : [...lines, lineCandidate]

const linesAreEqual = (lineA: Segment, lineB: Segment) =>
	lineA.every(a => lineB.some(b => coordinatesAreEqual(a, b)))