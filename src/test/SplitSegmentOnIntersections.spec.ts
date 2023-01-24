import splitSegmentOnIntersections from "../domain/SplitSegmentOnIntersections"
import {Coordinate} from "../domain/types/Coordinate"
import {Segment} from "../domain/types/Segment"

describe("SplitSegmentOnIntersections should", () => {
	let results: Array<Segment> = []

	beforeEach(() => {
		results = []
	})

	it("return same segment if no segment intersects it", () => {
		splitSegment([NON_INTERSECTING])

		expectResultsToBe([SEGMENT])
	})

	it("return same segment if set against itself", () => {
		splitSegment([SEGMENT])

		expectResultsToBe([SEGMENT])
	})

	it("return same segment if a non parallel shares an end", () => {
		splitSegment([SHARING_END_NON_PARALLEL])

		expectResultsToBe([SEGMENT])
	})

	it("return same segment if a parallel contains no end but shares one", () => {
		splitSegment([SHARING_END_PARALLEL])

		expectResultsToBe([SEGMENT])
	})

	it("return split segment if a parallel contains one end and shares the other", () => {
		const SPLITTER: Segment = [{x: 4, y: 1}, {x: 3, y: 1}]
		splitSegment([SPLITTER])

		const PART_1: Segment = [{x: 1, y: 1}, {x: 3, y: 1}]
		const PART_2: Segment = [{x: 3, y: 1}, {x: 4, y: 1}]
		expectResultsToBe([PART_1, PART_2])
	})

	it("return split segment if a parallel contains one end but does not share the other", () => {
		const SPLITTER: Segment = [{x: 5, y: 1}, {x: 3, y: 1}]
		splitSegment([SPLITTER])

		const PART_1: Segment = [{x: 1, y: 1}, {x: 3, y: 1}]
		const PART_2: Segment = [{x: 3, y: 1}, {x: 4, y: 1}]
		expectResultsToBe([PART_1, PART_2])
	})

	it("return split segment if a parallel contains both ends", () => {
		const SPLITTER: Segment = [{x: 2, y: 1}, {x: 3, y: 1}]
		splitSegment([SPLITTER])

		const PART_1: Segment = [{x: 1, y: 1}, {x: 2, y: 1}]
		const PART_2: Segment = [{x: 2, y: 1}, {x: 3, y: 1}]
		const PART_3: Segment = [{x: 3, y: 1}, {x: 4, y: 1}]
		expectResultsToBe([PART_1, PART_2, PART_3])
	})

	it("return split segment to its minimum parts when two parallel segments overlap with it", () => {
		const SPLITTER_1: Segment = [{x: 1, y: 1}, {x: 3, y: 1}]
		const SPLITTER_2: Segment = [{x: 2, y: 1}, {x: 4, y: 1}]
		splitSegment([SPLITTER_1, SPLITTER_2])

		const PART_1: Segment = [{x: 1, y: 1}, {x: 2, y: 1}]
		const PART_2: Segment = [{x: 2, y: 1}, {x: 3, y: 1}]
		const PART_3: Segment = [{x: 3, y: 1}, {x: 4, y: 1}]
		expectResultsToBe([PART_1, PART_2, PART_3])
	})

	function splitSegment(splitters: Array<Segment>) {
		results = splitSegmentOnIntersections(SEGMENT, splitters)
	}

	function expectResultsToBe(expected: Array<Segment>) {
		const missing = expected.filter(x => !results.some(y => segmentsAreEqual(x, y)))
		const exceeding = results.filter(x => !expected.some(y => segmentsAreEqual(x, y)))
		if ([...missing, ...exceeding].length)
			throw Error(`
				missing: ${JSON.stringify(missing)}
				exceeding: ${JSON.stringify(exceeding)}
				results: ${JSON.stringify(results)}
				expected: ${JSON.stringify(expected)}
			`)
	}
})

const SEGMENT: Segment = [{x: 1, y: 1}, {x: 4, y: 1}]
const NON_INTERSECTING: Segment = [{x: 2, y: 2}, {x: 3, y: 3}]
const SHARING_END_NON_PARALLEL: Segment = [{x: 4, y: 1}, {x: 4, y: 2}]
const SHARING_END_PARALLEL: Segment = [{x: 4, y: 1}, {x: 5, y: 1}]

const segmentsAreEqual = (segmentA: Segment, segmentB: Segment) =>
	segmentA.every(a => segmentB.some(b => coordinatesAreEqual(a, b)))
const coordinatesAreEqual = (coordinateA: Coordinate, coordinateB: Coordinate) =>
	coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y