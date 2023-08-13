import { Lot } from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate"
import { first } from "@web/domain/utils/LineUtils"
import React, { useRef, useState, useEffect } from "react"
import { Shape, Text } from "react-konva"
import { STATUS_COLORS } from '../../constants/lotStatus'


export default function NeighborhoodKonvaLot({ lot, administratorView }: { lot: Lot, administratorView: boolean }) {

	const [hovered, setHovered] = useState(false)
	const textRef = useRef<any>(null)

	const [center] = useState(() => centerOf(lot.coordinates))
	const [textCoordinates, setTextCoordinates] = useState(center);

	useEffect(() => {
		const width = textRef.current?.width();
		const height = textRef.current?.height();
		setTextCoordinates({ x: center.x - width / 2, y: center.y - height / 2 });
	}, [center.x, center.y]);

	let color = administratorView
					? hovered
						? "#FFE6FF" : lot.administrator?.color
					: hovered 
						? "#FFE6FF" : STATUS_COLORS[lot.status.replace(' ', '')]

	let textColor = administratorView
						? hovered
							? "#000"
							:"#e9e9e9"
						: "#000"
	
	return (
		<>
			<Shape
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				sceneFunc={(context, shape) => {
					context.beginPath()
					const [start, ...remaining] = lot.coordinates
					context.moveTo(start.x, start.y)
					remaining.forEach(({ x, y }) => context.lineTo(x, y))
					context.closePath()
					context.fillStrokeShape(shape)
				}}
				fill={color}
				stroke="black"
				strokeWidth={0.35}
			/>
			<Text
				fill={textColor}
				x={textCoordinates.x}
				y={textCoordinates.y}
				text={lot.name || undefined}
				fontSize={2.8}
				ref={textRef}
			/>
		</>
	)
}

function centerOf(coordinates: Array<Coordinate>): Coordinate {
	const boundaries = coordinates.reduce(
		(boundaries, coordinate) => ({
			minX: boundaries.minX > coordinate.x ? coordinate.x : boundaries.minX,
			maxX: boundaries.maxX < coordinate.x ? coordinate.x : boundaries.maxX,
			minY: boundaries.minY > coordinate.y ? coordinate.y : boundaries.minY,
			maxY: boundaries.maxY < coordinate.y ? coordinate.y : boundaries.maxY
		}),
		defaultBoundary(first(coordinates))
	)
	return {
		x: (boundaries.minX + boundaries.maxX) / 2,
		y: (boundaries.minY + boundaries.maxY) / 2
	}
}

const defaultBoundary = ({ x, y }: Coordinate) => ({
	minX: x,
	maxX: x,
	minY: y,
	maxY: y
})
