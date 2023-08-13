import { CategorizedSegments } from "@web/domain/types/CategorizedSegments"
import { Segment } from "@web/domain/types/Segment"

const PATH_START = "<path"
const PATH_END = "/>"
const BLOCK_BORDER_COLOR = "fuchsia"
const LOT_BORDER_COLOR = "red"

export default function transformXmlToLines(xml: string): CategorizedSegments {
	
	let offset = 0
	const lines: CategorizedSegments = { internals: [], externals: [] }

	while (true) {
		const start = xml.indexOf(PATH_START, offset)
		if (start === -1) break
		const end = xml.indexOf(PATH_END, offset)
		offset = end + PATH_END.length

		const element = xml.substring(start, end)

		const d = getAttribute(element, "d").replace("Z", "")
		const parts = d.split("L")
		const origin = parts[0].replace("M", "").split(" ")
		const destination = parts[1].split(" ")
		const line: Segment = [coordinate(origin), coordinate(destination)]

		const stroke = getAttribute(element, "stroke")
		if (stroke === BLOCK_BORDER_COLOR) lines.externals.push(line)
		else if (stroke === LOT_BORDER_COLOR) lines.internals.push(line)
	}

	return lines
}

const coordinate = (array: Array<string>) => ({
	x: Number(array[0]),
	y: Number(array[1])
})

function getAttribute(element: string, attribute: string) {
	const matcher = `${attribute}="`
	const start = element.indexOf(matcher)
	const end = element.indexOf('"', start + matcher.length)
	return element.substring(start + matcher.length, end)
}
