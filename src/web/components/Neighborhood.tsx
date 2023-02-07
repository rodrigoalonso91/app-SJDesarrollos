import React, {ChangeEvent, useEffect, useState} from "react"
import {Layer, Shape, Stage, Line as KonvaLine} from "react-konva"
import transformXmlToNeighborhoods from "../../domain/TransformXmlToNeighborhoods"
import {Coordinate} from "../../domain/types/Coordinate"
import {Line} from "../../domain/types/Line"


export default function Neighborhood() {

	const [wea, setWea] = useState<string | null>(null)
	const [fome, setFome] = useState<ReturnType<typeof transformXmlToNeighborhoods> | null>(null)
	useEffect(() => {
		if (wea)
			setFome(transformXmlToNeighborhoods(wea))
	}, [wea])

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
		setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale)
		setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale)
	}

	// Stage is a div container
	// Layer is actual canvas element (so you may have several canvases in the stage)
	// And then we have canvas shapes inside the Layer
	return (
		<>
			<input type="file" onChange={(e) => onFileUpload(e, setWea)}/>

			<div style={{display: "flex", flexDirection: "column"}}>
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
			>
				<Layer>
					{fome && fome.lots.map((block, i) =>
						<Block key={i} lots={block}/>
					)}
					{fome && fome.errors.map(({lines}, i) =>
						lines.map((line, j) =>
							<ErrorLine key={`${i}-${j}`} coordinates={line} highlighted={true}/>
						)
					)}
					{fome && fome.errors.map((error, i) =>
						(error.faulty || []).map((line, j) =>
							<ErrorLineCulprit key={`${i}-${j}`} coordinates={line} highlighted={true}/>
						)
					)}
				</Layer>
			</Stage>
		</>

	)
}

function Block({lots}: { lots: Array<Line> }) {
	return (
		<>
			{lots.map((coordinates, i) =>
				<Lot
					key={`${i}`}
					coordinates={coordinates}
				/>
			)}
		</>
	)
}

function Lot({coordinates: wea}: { coordinates: Array<Coordinate> }) {
	return (
		<Shape
			sceneFunc={(context, shape) => {
				context.beginPath()
				const [start, ...coordinates] = wea
				context.moveTo(start.x, start.y)
				coordinates.forEach(({x, y}) => context.lineTo(x, y))
				context.closePath()
				context.fillStrokeShape(shape)
			}}
			fill="#00D2FF"
			stroke="black"
			strokeWidth={0.35}
		/>
	)
}

function ErrorLine({coordinates, highlighted}: { coordinates: Array<Coordinate>, highlighted: boolean }) {
	const points = coordinates.flatMap(coordinate => [coordinate.x, coordinate.y])
	return (
		<KonvaLine
			points={points}
			fill="#00D2FF"
			stroke={highlighted ? "green" : "black"}
			strokeWidth={0.35}
		/>
	)
}

function ErrorLineCulprit({coordinates, highlighted}: { coordinates: Array<Coordinate>, highlighted: boolean }) {
	const points = coordinates.flatMap(coordinate => [coordinate.x, coordinate.y])
	return (
		<KonvaLine
			points={points}
			fill="#00D2FF"
			stroke={highlighted ? "red" : "black"}
			strokeWidth={highlighted ? 0.5 : 0.35}
		/>
	)
}

async function onFileUpload(e: ChangeEvent<HTMLInputElement>, callback: (value: string) => void) {
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
