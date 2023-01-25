import transformSegmentsToLotSides from "./TransformSegmentsToLotSides"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {coordinatesAreRoughlyEqual, first, last, linesTouchAtTheirEnds, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformSidesToLots(sides: ReturnType<typeof transformSegmentsToLotSides>) {
	return sides.map(createBlockLots).map(orderLines)
}

function orderLines(lots: Array<Array<Line>>) {
	const results = lots.map(lot => {
		let remaining = [...lot]

		const chain = [...remaining.shift()!]
		while (remaining.length) {
			const link = remaining.find(line => lineTouchesCoordinate(line, last(chain)))
			if (link === undefined) throw Error("Explosion")//TODO error
			const ordered = coordinatesAreRoughlyEqual(last(chain), first(link)) ? link : link.reverse()
			remaining = remaining.filter(x => x !== link)
			chain.push(...ordered)
		}

		return chain
		//TODO Assert chain uroboros
	})

	return results.filter(lot => lot.every(coordinate => coordinate !== undefined))
}

function getLotPerimeter(path: Array<Line>, destination: Coordinate, options: Array<Line>): Array<Line> | null {
	const current = last(path)
	if (lineTouchesCoordinate(current, destination)) return path
	const touching = options.filter(x => linesTouchAtTheirEnds(current, x))
	const remaining = options.filter(x => !touching.includes(x))
	for (const line of touching) {
		const result = getLotPerimeter([...path, line], destination, remaining)
		if (result !== null) return result
	}
	return null
}

function createBlockLots(block: { perimeter: Array<Line>, longs: Array<Line> }) {
	const perimeter = [...block.perimeter]
	const results: Array<Array<Line>> = []
	//TODO contemplate edge cases
	while (perimeter.length > 0) {
		const inners = [...block.longs]//TODO Maybe template this
		const external = perimeter.shift()!
		const start = inners.find(x => lineTouchesCoordinate(x, first(external)))!

		const result = getLotPerimeter([external, start], last(external), inners)
		if (result === null) continue//throw Error("Explosion")
		results.push(result)
	}
	return results
}
