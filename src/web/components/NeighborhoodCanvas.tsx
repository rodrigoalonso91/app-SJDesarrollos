import addNeighborhood from "@web/api_calls/neighborhood/addNeighborhood"
import transformXmlToNeighborhoods, {
	BlockError,
	Neighborhood,
	Block
} from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate"
import { first } from "@web/domain/utils/LineUtils"
import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from "react"
import { Layer, Shape, Stage, Line as KonvaLine, Text } from "react-konva"

export default function NeighborhoodCanvas() {
	const [neighborhoodXML, setNeighborhoodXML] = useState<string | null>(null)
	const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null)
	const [errors, setErrors] = useState<Array<BlockError> | null>(null)
	const [selected, setSelected] = useState<{
		block: number
		lot: number
	} | null>(null)

	const [lotText, setLotText] = useState("")
	const [blockText, setBlockText] = useState("")

	useEffect(() => {
		if (selected) {
			setBlockText(neighborhood!.blocks[selected.block].name)
			setLotText(neighborhood!.blocks[selected.block].lots[selected.lot].name)
		} else {
			setBlockText("")
			setLotText("")
		}
	}, [selected])

	useEffect(() => {
		if (neighborhoodXML) {
			const { neighborhood, errors } =
				transformXmlToNeighborhoods(neighborhoodXML)
			setNeighborhood(neighborhood)
			setErrors(errors)
		}
	}, [neighborhoodXML])

	const changeLotName = useCallback(
		(name: string, block: number, lot: number) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substituteNeighborhood = JSON.parse(
					JSON.stringify(neighborhood)
				) as Neighborhood
				substituteNeighborhood.blocks[block].lots[lot].name = name
				return substituteNeighborhood
			})
		},
		[neighborhood]
	)

	const changeBlockName = useCallback(
		(name: string, block: number) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substituteNeighborhood = JSON.parse(
					JSON.stringify(neighborhood)
				) as Neighborhood
				substituteNeighborhood.blocks[block].name = name
				return substituteNeighborhood
			})
		},
		[neighborhood]
	)

	const changeNeighborhoodName = useCallback(
		(name: string) => {
			setNeighborhood((neighborhood) => {
				if (neighborhood === null) return null
				const substituteNeighborhood = JSON.parse(
					JSON.stringify(neighborhood)
				) as Neighborhood
				substituteNeighborhood.name = name
				return substituteNeighborhood
			})
		},
		[neighborhood]
	)

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
		<MasterContext.Provider value={{ selected, setSelected }}>
			<input
				type="file"
				onChange={(e) => onFileUpload(e, setNeighborhoodXML)}
			/>
			<input
				placeholder="Manzana"
				disabled={selected === null}
				value={blockText}
				onChange={(e) => {
					setBlockText(e.target.value)
				}}
			/>
			<input
				placeholder="Lote"
				disabled={selected === null}
				value={lotText}
				onChange={(e) => {
					setLotText(e.target.value)
				}}
			/>

			<button
				onClick={() => {
					changeBlockName(blockText, selected?.block!)
					changeLotName(lotText, selected?.block!, selected?.lot!)
					setSelected(null)
				}}
				disabled={selected === null}
			>
				Confirmar Nombre de Lote y Manzana
			</button>

			<input
				placeholder="Barrio"
				value={neighborhood?.name || ""}
				onChange={(e) => {
					changeNeighborhoodName(e.target.value)
				}}
			/>
			<button
				onClick={() => {
					addNeighborhood(neighborhood!)
				}}
				disabled={!neighborhood?.name}
			>
				Guardar Master
			</button>
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
						neighborhood.blocks.map((block, i) => (
							<Block key={i} {...block} block={i} />
						))}
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
				</Layer>
			</Stage>
		</MasterContext.Provider>
	)
}

function Block({ lots, block }: Block & { block: number }) {
	return (
		<>
			{lots.map(({ coordinates, name }, i) => (
				<LotArea
					key={i}
					coordinates={coordinates}
					name={name}
					block={block}
					lot={i}
				/>
			))}
		</>
	)
}

function LotArea({
	name,
	coordinates,
	block,
	lot
}: {
	name: string
	block: number
	lot: number
	coordinates: Array<Coordinate>
}) {
	const [hovered, setHovered] = useState(false)
	const textRef = useRef<any>(null)
	const [center, setCenter] = useState(() => centerOf(coordinates))

	const { setSelected, selected } = useContext(MasterContext)

	React.useEffect(() => {
		const width = textRef.current?.width()
		const height = textRef.current?.height()
		setCenter({ x: center.x - width / 2, y: center.y - height / 2 })
	}, [])

	let color = "transparent"
	if (lot === selected?.lot && block === selected?.block)
		color = hovered ? "darkblue" : "blue"
	else if (block === selected?.block) color = hovered ? "darkorange" : "orange"
	else if (hovered) color = "lightblue"

	return (
		<>
			<Shape
				onClick={() => setSelected({ block, lot })}
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
				fill={color}
				stroke="black"
				strokeWidth={0.35}
			/>
			<Text x={center.x} y={center.y} text={name} fontSize={1} ref={textRef} />
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

const MasterContext = React.createContext<MasterContextProps>({
	setSelected: () => {},
	selected: null
})

type MasterContextProps = {
	setSelected: ({}: { block: number; lot: number }) => void
	selected: { block: number; lot: number } | null
}
