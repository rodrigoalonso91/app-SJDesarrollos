import transformBlockSidesToLots from "@web/domain/TransformBlockSidesToLots"
import { Coordinate } from "@web/domain/types/Coordinate"
import { Line } from "@web/domain/types/Line"

describe("TransformBlockSidesToLots should", () => {
	let results: Array<Array<Coordinate>> = []

	beforeEach(() => {
		results = []
	})

	it("return a block sized lot when no internal lines", () => {
		const LOWER_LEFT = { x: 1, y: 1 }
		const LOWER_RIGHT = { x: 2, y: 1 }
		const UPPER_LEFT = { x: 1, y: 2 }
		const UPPER_RIGHT = { x: 2, y: 2 }
		const externals = [[LOWER_LEFT, LOWER_RIGHT, UPPER_RIGHT, UPPER_LEFT]]

		transform({ externals, internals: [] })

		expected([LOWER_LEFT, LOWER_RIGHT, UPPER_RIGHT, UPPER_LEFT])
	})

	it("return two blocks when an internal line crosses in half", () => {
		const LOWER_LEFT = { x: 1, y: 1 }
		const LOWER_RIGHT = { x: 2, y: 1 }
		const UPPER_LEFT = { x: 1, y: 3 }
		const UPPER_RIGHT = { x: 2, y: 3 }
		const MIDDLE_LEFT = { x: 1, y: 2 }
		const MIDDLE_RIGHT = { x: 2, y: 2 }

		const externals = [
			[MIDDLE_LEFT, LOWER_LEFT, LOWER_RIGHT, MIDDLE_RIGHT],
			[MIDDLE_LEFT, UPPER_LEFT, UPPER_RIGHT, MIDDLE_RIGHT]
		]
		const internals = [[MIDDLE_LEFT, MIDDLE_RIGHT]]

		transform({ externals, internals })

		expected(
			[LOWER_LEFT, LOWER_RIGHT, MIDDLE_RIGHT, MIDDLE_LEFT],
			[UPPER_LEFT, UPPER_RIGHT, MIDDLE_RIGHT, MIDDLE_LEFT]
		)
	})

	it("return four blocks when cut in half vertically and horizontally", () => {
		const LOWER_LEFT = { x: 1, y: 1 }
		const LOWER_RIGHT = { x: 3, y: 1 }
		const UPPER_LEFT = { x: 1, y: 3 }
		const UPPER_RIGHT = { x: 3, y: 3 }
		const MIDDLE_LEFT = { x: 1, y: 2 }
		const MIDDLE_RIGHT = { x: 3, y: 2 }
		const UPPER_MIDDLE = { x: 2, y: 3 }
		const LOWER_MIDDLE = { x: 2, y: 1 }
		const CENTER = { x: 2, y: 2 }

		const externals = [
			[MIDDLE_LEFT, LOWER_LEFT, LOWER_MIDDLE],
			[MIDDLE_LEFT, UPPER_LEFT, UPPER_MIDDLE],
			[MIDDLE_RIGHT, LOWER_RIGHT, LOWER_MIDDLE],
			[MIDDLE_RIGHT, UPPER_RIGHT, UPPER_MIDDLE]
		]
		const internals = [
			[MIDDLE_LEFT, CENTER],
			[MIDDLE_RIGHT, CENTER],
			[LOWER_MIDDLE, CENTER],
			[UPPER_MIDDLE, CENTER]
		]

		transform({ externals, internals })

		expected(
			[LOWER_LEFT, LOWER_MIDDLE, CENTER, MIDDLE_LEFT],
			[LOWER_RIGHT, LOWER_MIDDLE, CENTER, MIDDLE_RIGHT],
			[UPPER_RIGHT, UPPER_MIDDLE, CENTER, MIDDLE_RIGHT],
			[UPPER_LEFT, UPPER_MIDDLE, CENTER, MIDDLE_LEFT]
		)
	})

	it("return lots when running across", () => {
		const LEFT_0 = { x: 1, y: 0 }
		const LEFT_1 = { x: 1, y: 1 }
		const LEFT_2 = { x: 1, y: 2 }
		const LEFT_3 = { x: 1, y: 3 }
		const RIGHT_0 = { x: 2, y: 0 }
		const RIGHT_1 = { x: 2, y: 1 }
		const RIGHT_2 = { x: 2, y: 2 }
		const RIGHT_3 = { x: 2, y: 3 }

		const externals = [
			[RIGHT_1, RIGHT_0, LEFT_0, LEFT_1],
			[LEFT_1, LEFT_2],
			[LEFT_2, LEFT_3, RIGHT_3, RIGHT_2],
			[RIGHT_2, RIGHT_1]
		]
		const internals = [
			[LEFT_1, RIGHT_1],
			[LEFT_2, RIGHT_2]
		]

		transform({ externals, internals })

		expected(
			[LEFT_0, LEFT_1, RIGHT_1, RIGHT_0],
			[LEFT_1, LEFT_2, RIGHT_2, RIGHT_1],
			[LEFT_2, LEFT_3, RIGHT_3, RIGHT_2]
		)
	})

	function transform(params: {
		externals: Array<Line>
		internals: Array<Line>
	}) {
		results = transformBlockSidesToLots(params)
	}

	function expected(...expected: Array<Array<Coordinate>>) {
		const missing = expected.filter(
			(x) => !results.some((y) => shapesAreEqual(x, y))
		)
		const exceeding = results.filter(
			(x) => !expected.some((y) => shapesAreEqual(x, y))
		)
		if ([...missing, ...exceeding].length)
			throw Error(
				`Results: \n${results
					.map((result) => JSON.stringify(result))
					.join("\n")}`
			)
	}
})

const shapesAreEqual = (
	shapeB: Array<Coordinate>,
	shapeA: Array<Coordinate>
) => {
	if (shapeB.length !== shapeA.length) return false
	const a0 = shapeA[0]
	const offset = shapeB.findIndex((b) => coordinatesAreEqual(b, a0))
	if (offset === -1) return false
	const total = shapeB.length
	return (
		shapeA.every((a, i) =>
			coordinatesAreEqual(a, shapeB[(offset + i) % total])
		) ||
		shapeA.every((a, i) =>
			coordinatesAreEqual(a, shapeB[(total + offset - i) % total])
		)
	)
}

const coordinatesAreEqual = (
	coordinateA: Coordinate,
	coordinateB: Coordinate
) => coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y
