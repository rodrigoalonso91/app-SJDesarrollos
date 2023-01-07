import removeRedundantLines from "./RemoveRedundantLines"
import transformXmlToLines from "./TransformXmlToLines"
import {Coordinate} from "./types/Coordinate"
import {Line} from "./types/Line"
import {Perimeter} from "./types/Perimeter"
import getOtherCoordinateFromLine from "./utils/GetOtherCoordinateFromLine"
import lineTouchesCoordinate from "./utils/LineTouchesCoordinate"
import transformLinesToBlockPerimeters from "./utils/TransformLinesToBlockPerimeters"

export default function transformXmlToNeighborhoods(xml: string) {
	const raw = transformXmlToLines(xml)
	const lines = removeRedundantLines(raw)
	const perimeters = transformLinesToBlockPerimeters(lines.block)
	return transformPerimetersLongLines(perimeters, lines.lot)
	return perimeters
}

function transformPerimetersLongLines(perimeters: Array<Perimeter>, lines: Array<Line>) {
	const perimetersAsLongLines: Array<Array<LongLine>> = []
	for (const perimeter of perimeters) {

		const firsts: LongLine = []
		let current: LongLine = firsts
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

	return transformLinesIntoLongs(perimetersAsLongLines, [...lines])
}

function transformLinesIntoLongs(perimeters: Array<Array<LongLine>>, lines: Array<Line>) {

	return perimeters.map(perimeter => {
		const origins = perimeter.map(line => line[0])
		const longs: Array<LongLine> = []
		while (true) {
			const long = []
			const origin = origins.shift()
			if (origin === undefined) break
			long.push(origin)
			let current = origin

			while(true) {
				const found = lines.filter(line => lineTouchesCoordinate(line, current))
				lines = lines.filter(line => !found.includes(line))

console.log(found.length)
				if (found.length === 0) break
				else if (found.length === 1) {
					current = getOtherCoordinateFromLine(found[0], current)
					long.push(current)
				} else {
					const additions = found.map(line => getOtherCoordinateFromLine(line, current))
					origins.push(...additions)
					break
				}
			}

			longs.push(long)
		}
		console.log("perimeter", perimeter.length)
		console.log("longs", longs.length)
		return {perimeter, longs}
	})

}

type LongLine = Array<Coordinate>
