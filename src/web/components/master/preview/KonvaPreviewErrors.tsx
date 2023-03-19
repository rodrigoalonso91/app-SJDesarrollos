import { BlockError } from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate"
import React from "react"
import { Line as KonvaLine } from "react-konva"

export default function KonvaPreviewErrors({
	errors
}: {
	errors: Array<BlockError>
}) {
	return (
		<>
			{errors &&
				errors.map(({ lines }, i) =>
					lines.map((line, j) => (
						<ErrorLine
							key={`${i}-${j}`}
							coordinates={line}
							highlighted={true}
						/>
					))
				)}
			{errors &&
				errors.map((error, i) =>
					(error.faulty || []).map((line, j) => (
						<ErrorLineCulprit
							key={`${i}-${j}`}
							coordinates={line}
							highlighted={true}
						/>
					))
				)}
		</>
	)
}

function ErrorLine({
	coordinates,
	highlighted
}: {
	coordinates: Array<Coordinate>
	highlighted: boolean
}) {
	const points = coordinates.flatMap((coordinate) => [
		coordinate.x,
		coordinate.y
	])
	return (
		<KonvaLine
			points={points}
			fill="#00D2FF"
			stroke={highlighted ? "green" : "black"}
			strokeWidth={0.35}
		/>
	)
}

function ErrorLineCulprit({
	coordinates,
	highlighted
}: {
	coordinates: Array<Coordinate>
	highlighted: boolean
}) {
	const points = coordinates.flatMap((coordinate) => [
		coordinate.x,
		coordinate.y
	])
	return (
		<KonvaLine
			points={points}
			fill="#00D2FF"
			stroke={highlighted ? "red" : "black"}
			strokeWidth={highlighted ? 0.5 : 0.35}
		/>
	)
}
