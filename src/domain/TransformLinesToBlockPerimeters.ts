import {SimpleLine} from "./types/SimpleLine"
import {Perimeter} from "./types/Perimeter"
import {coordinatesAreEqual, getOtherEnd, lineTouchesCoordinate} from "./utils/LineUtils"

export default function transformLinesToBlockPerimeters(lines: Array<SimpleLine>) {
	const perimeters: Array<Perimeter> = []
	while (lines.length > 0) {
		const [first, second] = lines.pop()!
		const perimeter = [first, second]

		while (true) {
			const last = perimeter[perimeter.length - 1]
			const touching = lines.filter(line => lineTouchesCoordinate(line, last))
			if (touching.length > 1) throw Error(`found more than one touching border: ${JSON.stringify(touching)}`)
			if (touching.length === 0) throw Error(`perimeter could not be completed due to lack of lines`)
			const line = touching[0]
			lines = lines.filter(x => x !== line)
			const next = getOtherEnd(line, last)
			if (coordinatesAreEqual(next, first)) break
			else perimeter.push(next)
		}

		perimeters.push(perimeter)
	}

	return perimeters
}
