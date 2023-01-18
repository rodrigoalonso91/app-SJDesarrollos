import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {Perimeter} from "./types/Perimeter"
import {SimpleLine} from "./types/SimpleLine"
import {coordinatesAreEqual, first, getOtherEnd, last, linesTouch, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformToLongLines(blocks: Array<Line>, inners: Array<SimpleLine>) {
	//A block is an array of coordinates. We need to decompose it into lines that will be the sides of a lot.
	const externals = segmentBlocks(blocks, inners)
	//External lines are grouped with related internal lines, scoped by block.
	const longBlocks = groupExternalsWithRelatedInners(externals, [...inners])

	return longBlocks.map(createBlockLots).map(orderLines)
}

function segmentBlocks(perimeters: Array<Perimeter>, inners: Array<SimpleLine>) {
	const results: Array<Lines> = []
	for (const perimeter of perimeters) {
		const firsts: Line = []
		let current: Line = firsts
		const longs = []
		for (let i = 0; i < perimeter.length; i++) {
			const coordinate = perimeter[i]
			const touching = inners.filter(line => lineTouchesCoordinate(line, coordinate))

			if (touching.length > 1) throw Error(`found more than one lot line touching a block perimeter coordinate: ${JSON.stringify(touching)}`)

			current.push(coordinate)
			if (touching.length === 0) continue
			current = [coordinate]
			longs.push(current)
		}

		const lasts = longs[longs.length - 1]
		longs[longs.length - 1] = [...lasts, ...firsts]
		results.push(longs)
	}
	return results
}

function groupExternalsWithRelatedInners(perimeters: Array<Array<Line>>, simples: Array<SimpleLine>) {
	return perimeters.map(perimeter => {
		const origins = perimeter.map(line => first(line))

		const longs: Array<Line> = []
		while (origins.length > 0) {
			const origin = origins.shift()!
			if(longs.some(long => lineTouchesCoordinate(long, origin))) continue
			longs.push(...xuxa({line: [origin], simples}))
		}

		return {perimeter, longs: longs.filter(x => x.length > 1)}
	})
}

function xuxa({line, simples}: { line: Line, simples: Array<SimpleLine>}): Array<Line> {
	const current = last(line)
	const found = simples.filter(simple => lineTouchesCoordinate(simple, current))

	if (found.length === 0) return [line]
	const remaining = simples.filter(simple => !found.includes(simple))

	if (found.length === 1) return xuxa({line: [...line, getOtherEnd(found[0], current)], simples: remaining})

		const additions = found.map(line => getOtherEnd(line, current))

		return [
			line,
			...additions.flatMap(addition => xuxa({line: [current, addition], simples: remaining}))
		]
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

type Lines = Array<Line>