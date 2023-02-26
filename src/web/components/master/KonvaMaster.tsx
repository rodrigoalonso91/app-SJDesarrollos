import styled from "@emotion/styled"
import addNeighborhood from "@web/api_calls/neighborhood/addNeighborhood"
import BlockInputs from "@web/components/master/BlockInputs"
import KonvaBlock from "@web/components/master/KonvaBlock"
import KonvaErrorLines from "@web/components/master/KonvaErrorLines"
import MasterContext, {
	SelectedLot
} from "@web/components/master/MasterContext"
import useNeighborhood from "@web/components/master/UseNeighborhood"
import React, { useEffect, useState } from "react"
import { Layer, Stage } from "react-konva"

export default function KonvaMaster() {
	const {
		onFileUpload,
		errors,
		neighborhood,
		changeNeighborhoodName,
		changeBlockName,
		changeLotName
	} = useNeighborhood()
	const [selected, setSelected] = useState<SelectedLot | null>(null)

	const [stageScale, setStageScale] = useState(1)
	const [stageX, setStageX] = useState(0)
	const [stageY, setStageY] = useState(0)

	useEffect(() => {
		if (!neighborhood) return
		if (!errors) return
		const boundaries = neighborhood.blocks
			.flatMap((block) => block.lots)
			.flatMap((lot) => lot.coordinates)
			.concat(errors.flatMap((error) => error.lines).flatMap((line) => line))
			.reduce(
				({ minX, minY, maxX, maxY }, { x, y }) => ({
					minX: minX === null ? x : Math.min(minX, x),
					minY: minY === null ? y : Math.min(minY, y),
					maxX: maxX === null ? y : Math.max(maxX, y),
					maxY: maxY === null ? y : Math.max(maxY, y)
				}),
				{ minX: null, minY: null, maxX: null, maxY: null } as
					| { minX: null; minY: null; maxX: null; maxY: null }
					| { minX: number; minY: number; maxX: number; maxY: number }
			)

		if (boundaries.minX === null) return
		const height = boundaries.maxY - boundaries.minY
		if (height > 0) {
			const scale = window.innerHeight / height
			setStageScale(scale)
			setStageX(-boundaries.minX * scale)
			setStageY(-boundaries.minY * scale)
		}
	}, [errors])

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

	return (
		<MasterContext.Provider
			value={{
				selected,
				setSelected,
				neighborhood,
				changeBlockName,
				changeLotName
			}}
		>
			<input type="file" onChange={onFileUpload} />

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
			<KonvaContainer>
				<Stage
					width={window.innerWidth * 0.7}
					height={window.innerHeight}
					onWheel={handleWheel}
					scaleX={stageScale}
					scaleY={stageScale}
					x={stageX}
					y={stageY}
					draggable={true}
				>
					<Layer>
						{neighborhood &&
							neighborhood.blocks.map((block, i) => (
								<KonvaBlock key={i} {...block} block={i} />
							))}
						{errors && <KonvaErrorLines errors={errors} />}
					</Layer>
				</Stage>
				{selected && <BlockInputs />}
			</KonvaContainer>
		</MasterContext.Provider>
	)
}

const KonvaContainer = styled.div`
	display: flex;
	border: 1px solid black;
`
