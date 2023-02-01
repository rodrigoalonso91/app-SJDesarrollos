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
			console.log(wea)
		if (wea)
			setFome(transformXmlToNeighborhoods(wea))
	}, [wea])

	useEffect(() => {
	}, [fome])

	// Stage is a div container
	// Layer is actual canvas element (so you may have several canvases in the stage)
	// And then we have canvas shapes inside the Layer
	return (
		<>
			<input type="file" onChange={(e) => onFileUpload(e, setWea)}/>
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					{fome && fome.lots.map((block, i) =>
						<Block key={i} lots={block}/>
					)}
					{fome && fome.errors.map((lines, i) =>
						lines.map((line, j) =>
							<ErrorLine key={`${i}-${j}`} coordinates={line}/>
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
					key={i}
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
			strokeWidth={1}
		/>
	)
}

function ErrorLine({coordinates: wea}: { coordinates: Array<Coordinate> }) {
	const points = wea.flatMap(coordinate => [coordinate.x, coordinate.y])
	return (
		<KonvaLine
			points={points}
			fill="#00D2FF"
			stroke="black"
			strokeWidth={1}
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
