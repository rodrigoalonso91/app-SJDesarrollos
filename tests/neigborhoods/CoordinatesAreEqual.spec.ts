import coordinatesAreEqual from "../../src/domain/utils/CoordinatesAreEqual"

const X1 = "1"
const X2 = "2"
const Y1 = "10"
const Y2 = "16"

describe("CoordinatesAreEqual should", () => {
	test("return true when both x and y are equal", () => {
		const result = coordinatesAreEqual({x: X1, y: Y1}, {x: X1, y: Y1})
		expect(result).toBe(true)
	})

	test("return false when both x and y are different", () => {
		const result = coordinatesAreEqual({x: X1, y: Y1}, {x: X2, y: Y2})
		expect(result).toBe(false)
	})

	test("return false when x is equal but y is different", () => {
		const result = coordinatesAreEqual({x: X1, y: Y1}, {x: X1, y: Y2})
		expect(result).toBe(false)
	})

	test("return false when y is equal but x is different", () => {
		const result = coordinatesAreEqual({x: X1, y: Y1}, {x: X2, y: Y1})
		expect(result).toBe(false)
	})
})