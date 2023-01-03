import {Line} from "./Line"
import {Lines} from "./Lines"

const PATH_START = "<path"
const PATH_END = "/>"

export default function transformXmlToLines(xml: string): Lines {
	let offset = 0
	const block: Array<Line> = []
	const lot: Array<Line> = []

	while (true) {
		const start = xml.indexOf(PATH_START, offset)
		if (start === -1) break
		const end = xml.indexOf(PATH_END, offset)
		offset = end + PATH_END.length

		const element = xml.substring(start, end)
		const d = getAttribute(element, "d")
		const stroke = getAttribute(element, "stroke")

		//We ignore Z occurrences since the converter seems to generate them needlessly
		if (d.includes("Z")) continue

		const parts = d.split("L")
		const origin = parts[0].replace("M", "").split(" ")
		const destination = parts[1].split(" ")
		const line: Line = [{x: origin[0], y: origin[1]}, {x: destination[0], y: destination[1]}]

		if (stroke === "green")
			block.push(line)
		else if (stroke === "red")
			lot.push(line)
	}

	return {block, lot}
}

function getAttribute(element: string, attribute: string) {
		const matcher = `${attribute}="`
		const start = element.indexOf(matcher)
		const end = element.indexOf("\"", start + matcher.length)
		return element.substring(start + matcher.length, end)
}
