import transformLinesToLotSides from "./TransformLinesToLotSides"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {coordinatesAreEqual, first, last, linesTouch, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformToLots(sides: ReturnType<typeof transformLinesToLotSides>) {
	return sides.map(createBlockLots).map(orderLines)
}

function orderLines(lots: Array<Array<Line>>) {
	const results = lots.map(lot => {
		let remaining = [...lot]

		const chain = [...remaining.shift()!]
		while (remaining.length) {
			const link = remaining.find(line => lineTouchesCoordinate(line, last(chain)))
			if (link === undefined) throw Error("Explosion")//TODO error
			const ordered = coordinatesAreEqual(last(chain), first(link)) ? link : link.reverse()
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
	const touching = options.filter(x => linesTouch(current, x))
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
		if (result === null) throw Error("Explosion")
		results.push(result)
	}
	return results
}
