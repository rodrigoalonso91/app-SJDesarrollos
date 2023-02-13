import transformXmlToNeighborhoods from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate"
import { Line } from "@web/domain/types/Line"
import { first } from "@web/domain/utils/LineUtils"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { Layer, Shape, Stage, Line as KonvaLine, Text } from "react-konva"

export default function Neighborhood() {
	const [neighborhoodXML, setNeighborhoodXML] = useState<string | null>(null)
	const [neighborhood, setNeighborhood] = useState<ReturnType<
		typeof transformXmlToNeighborhoods
	> | null>(null)
	useEffect(() => {
		if (neighborhoodXML)
			setNeighborhood(transformXmlToNeighborhoods(neighborhoodXML))
	}, [neighborhoodXML])

	const [stageScale, setStageScale] = useState(1)
	const [stageX, setStageX] = useState(0)
	const [stageY, setStageY] = useState(0)

	const handleWheel = (e: any) => {
		e.evt.preventDefault()

		const scaleBy = 1.1
		const stage = e.target.getStage()
		const oldScale = stage.scaleX()
		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		}

		const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

		setStageScale(newScale)
		setStageX(
			-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
		)
		setStageY(
			-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
		)
	}

	// Stage is a div container
	// Layer is actual canvas element (so you may have several canvases in the stage)
	// And then we have canvas shapes inside the Layer
	return (
		<>
			<input
				type="file"
				onChange={(e) => onFileUpload(e, setNeighborhoodXML)}
			/>

			<div style={{ display: "flex", flexDirection: "column" }}>
				{/*
					fome && fome.errors.map(({error}, i) => (
							<span
								onMouseEnter={() => setErrorIndex(i)}
								onMouseLeave={() => setErrorIndex(null)}
							>
							{error}
							</span>
						)
					)
				*/}
			</div>
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onWheel={handleWheel}
				scaleX={stageScale}
				scaleY={stageScale}
				x={stageX}
				y={stageY}
				draggable={true}
				style={{ border: "solid 1px black" }}
			>
				<Layer>
					{neighborhood &&
						neighborhood.lots.map((block, i) => <Block key={i} lots={block} />)}
					{neighborhood &&
						neighborhood.errors.map(({ lines }, i) =>
							lines.map((line, j) => (
								<ErrorLine
									key={`${i}-${j}`}
									coordinates={line}
									highlighted={true}
								/>
							))
						)}
					{neighborhood &&
						neighborhood.errors.map((error, i) =>
							(error.faulty || []).map((line, j) => (
								<ErrorLineCulprit
									key={`${i}-${j}`}
									coordinates={line}
									highlighted={true}
								/>
							))
						)}
				</Layer>
			</Stage>
		</>
	)
}

function Block({ lots }: { lots: Array<Line> }) {
	return (
		<>
			{lots.map((coordinates, i) => (
				<Lot key={i} coordinates={coordinates} />
			))}
		</>
	)
}

function Lot({ coordinates }: { coordinates: Array<Coordinate> }) {
	const [hovered, setHovered] = useState(false)
	const textRef = useRef<any>(null)
	const [center, setCenter] = useState(() => centerOf(coordinates))

	React.useEffect(() => {
		const width = textRef.current?.width()
		const height = textRef.current?.height()
		console.log(width)
		setCenter({
			x: center.x - width / 2,
			y: center.y - height / 2
		})
	}, [])

	return (
		<>
			<Shape
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				sceneFunc={(context, shape) => {
					context.beginPath()
					const [start, ...remaining] = coordinates
					context.moveTo(start.x, start.y)
					remaining.forEach(({ x, y }) => context.lineTo(x, y))
					context.closePath()
					context.fillStrokeShape(shape)
				}}
				fill={hovered ? "green" : "lightblue"}
				stroke="black"
				strokeWidth={0.35}
			/>
			<Text x={center.x} y={center.y} text={"o"} fontSize={1} ref={textRef} />
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

async function onFileUpload(
	e: ChangeEvent<HTMLInputElement>,
	callback: (value: string) => void
) {
	if (!e.target.files) return
	const file = e.target.files[0]
	const result = await encode(file)
	callback(result)
}

async function encode(file: File): Promise<string> {
	const promise = new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (ev) => resolve(ev.target!.result as string)
		reader.onerror = reject
		reader.readAsText(file, "UTF-8")
	})
	return await promise
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
