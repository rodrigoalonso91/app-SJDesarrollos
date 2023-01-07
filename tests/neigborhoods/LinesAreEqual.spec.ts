import { Line } from "../../src/domain/types/Line"
import linesAreEqual from "../../src/domain/utils/LinesAreEqual"

const MATCHING_COORDINATE_A_1 = {x: "1", y: "2"}
const MATCHING_COORDINATE_A_2 = {x: "1", y: "2"}
const MATCHING_COORDINATE_B_1 = {x: "4", y: "5"}
const MATCHING_COORDINATE_B_2 = {x: "4", y: "5"}
const IRRELEVANT = {x: "10", y: "10"}

describe("CoordinatesAreEqual should", () => {
	test("return false when a coordinate does not match", () => {
		const lineA: Line = [MATCHING_COORDINATE_A_1, MATCHING_COORDINATE_B_1]
		const lineB: Line= [MATCHING_COORDINATE_A_2, IRRELEVANT]
		const result = linesAreEqual(lineA, lineB)
		expect(result).toBe(false)
	})

	test("return true when all coordinates match", () => {
		const lineA: Line = [MATCHING_COORDINATE_A_1, MATCHING_COORDINATE_B_1]
		const lineB: Line= [MATCHING_COORDINATE_A_2, MATCHING_COORDINATE_B_2]
		const result = linesAreEqual(lineA, lineB)
		expect(result).toBe(true)
	})

	test("return true when all coordinates match but is reversed", () => {
		const lineA: Line = [MATCHING_COORDINATE_B_1, MATCHING_COORDINATE_A_1]
		const lineB: Line= [MATCHING_COORDINATE_A_2, MATCHING_COORDINATE_B_2]
		const result = linesAreEqual(lineA, lineB)
		expect(result).toBe(true)
	})
})