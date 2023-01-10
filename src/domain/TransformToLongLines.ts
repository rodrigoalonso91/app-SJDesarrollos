import {Line} from "./types/Line"
import {SimpleLine} from "./types/SimpleLine"
import {Perimeter} from "./types/Perimeter"
import {coordinatesAreEqual, first, getOtherEnd, last, linesTouch, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformToLongLines(perimeters: Array<Perimeter>, lines: Array<SimpleLine>) {
	const longPerimeters = transformPerimeterToLongs(perimeters, lines)
	const longBlocks = transformLinesToLongs(longPerimeters, [...lines])
	return wea(longBlocks)
}

function transformPerimeterToLongs(perimeters: Array<Perimeter>, lines: Array<SimpleLine>) {
	const perimetersAsLongLines: Array<Array<Line>> = []
	for (const perimeter of perimeters) {

		const firsts: Line = []
		let current: Line = firsts
		const longs = []
		for (let i = 0; i < perimeter.length; i++) {
			const coordinate = perimeter[i]
			const touching = lines.filter(line => lineTouchesCoordinate(line, coordinate))

			if (touching.length > 1) throw Error(`found more than one lot line touching a block perimeter coordinate: ${JSON.stringify(touching)}`)

			current.push(coordinate)
			if (touching.length === 0) continue
			current = [coordinate]
			longs.push(current)
		}

		const lasts = longs[longs.length - 1]
		longs[longs.length - 1] = [...lasts, ...firsts]
		perimetersAsLongLines.push(longs)
	}
	return perimetersAsLongLines
}

function transformLinesToLongs(perimeters: Array<Array<Line>>, simples: Array<SimpleLine>) {

	return perimeters.map(perimeter => {
		const longs = perimeter.map(line => [first(line)])

		let i = 0
		while (i < longs.length) {
			const long = longs[i]

			while (true) {
				const current = last(long)
				const found = simples.filter(simple => lineTouchesCoordinate(simple, current))
				simples = simples.filter(simple => !found.includes(simple))

				if (found.length === 0) {
				 break
				}
				else if (found.length === 1) {
					long.push(getOtherEnd(found[0], current))
				} else {
					const additions = found.map(line => getOtherEnd(line, current))
					additions.forEach(addition => {longs.push([current, addition])})
					break
				}
			}

			i++
		}

		console.log("perimeter", perimeter.length)
		console.log("longs", longs.filter(x => x.length > 1).length)
		return {perimeter, longs: longs.filter(x => x.length > 1)}
	})
}

function wea(blocks: Array<{ perimeter: Array<Line>, longs: Array<Line> }>) {
			//console.log(JSON.stringify(blocks[0].longs))
	const block_lots = blocks.map(block => {
		const perimeter = [...block.perimeter]
		const results: Array<Array<Line>> = []
		//TODO contemplate edge cases
		while (true) {
			const inners = [...block.longs]//TODO Maybe template this
			const external = perimeter.shift()
			if (external === undefined) break
			const innerA = inners.find(x => lineTouchesCoordinate(x, first(external)))!
			const innerB = inners.find(x => lineTouchesCoordinate(x, last(external)))!
			if (linesTouch(innerB, innerA)) {
			 results.push([innerA, innerB, external])
			 console.log(3)
			}	else {
				const closer = inners.find(x => linesTouch(x, innerA) && linesTouch(x, innerB))!
			console.log("external", external)
			console.log("a", innerA)
			console.log("b", innerB)
			console.log("closer", closer)
				results.push([innerA, innerB, external, closer])
			 console.log(4)
			}
		}
		return results
	})

	const results =  block_lots.map(lots => {
		return lots.filter(x => x.length === 3).map(lot => {
			let remaining = [...lot]
		//console.log(lot)
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

	})

	return results.map(lots => lots.filter(lot => lot.every(coordinate => coordinate !== undefined)))
}
