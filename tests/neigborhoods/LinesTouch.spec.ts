import { Line } from "../../src/domain/types/Line"
import linesAreEqual from "../../src/domain/utils/LinesAreEqual"
import linesTouch from "../../src/domain/utils/LinesTouch"

const MATCHING_COORDINATE_1 = {x: "1", y: "2"}
const MATCHING_COORDINATE_2 = {x: "1", y: "2"}
const IRRELEVANT_1 = {x: "10", y: "10"}
const IRRELEVANT_2 = {x: "20", y: "20"}
const IRRELEVANT_3 = {x: "30", y: "30"}
const IRRELEVANT_4 = {x: "40", y: "40"}

describe("LinesTouch should", () => {
	test("return true when both have the same origin", () => {
		const lineA: Line = [MATCHING_COORDINATE_1, IRRELEVANT_1]
		const lineB: Line= [MATCHING_COORDINATE_2, IRRELEVANT_2]
		const result = linesTouch(lineA, lineB)
		expect(result).toBe(true)
	})

	test("return true when both have the same destination", () => {
		const lineA: Line = [IRRELEVANT_1, MATCHING_COORDINATE_1]
		const lineB: Line= [IRRELEVANT_2, MATCHING_COORDINATE_2]
		const result = linesTouch(lineA, lineB)
		expect(result).toBe(true)
	})

	test("return true when destination and origin match", () => {
		const lineA: Line = [MATCHING_COORDINATE_1, IRRELEVANT_1]
		const lineB: Line= [IRRELEVANT_2, MATCHING_COORDINATE_2]
		const result = linesTouch(lineA, lineB)
		expect(result).toBe(true)
	})

	test("return true when origin and destination match", () => {
		const lineA: Line = [IRRELEVANT_1, MATCHING_COORDINATE_1]
		const lineB: Line= [MATCHING_COORDINATE_2, IRRELEVANT_2]
		const result = linesTouch(lineA, lineB)
		expect(result).toBe(true)
	})

	test("return false when none match", () => {
		const lineA: Line = [IRRELEVANT_1, IRRELEVANT_2]
		const lineB: Line= [IRRELEVANT_3, IRRELEVANT_4]
		const result = linesTouch(lineA, lineB)
		expect(result).toBe(false)
	})
})