import styled from "@emotion/styled"
import { Box, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material"
import TextField from "@mui/material/TextField"
import addNeighborhood from "@web/api_calls/neighborhood/addNeighborhood"
import BlockInputs from "@web/components/master/BlockInputs"
import KonvaBlock from "@web/components/master/KonvaBlock"
import KonvaErrorLines from "@web/components/master/KonvaErrorLines"
import MasterContext, { SelectedLot } from "@web/components/master/MasterContext"
import useNeighborhood from "@web/components/master/UseNeighborhood"
import React, { useEffect, useState } from "react"
import { Layer, Stage } from "react-konva"
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import { bottom, right } from "@popperjs/core"
import { minHeight, minWidth } from "@mui/system"
import getNeighborhoodByName from '../../api_calls/neighborhood/getNeighborhoodByName'
import updateNeighborhoodInDb from "@web/api_calls/neighborhood/updateNeighborhoodInDb"
import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import mergeObjects from '../../domain/utils/MergeObjects'
import Snackbar from "@mui/material/Snackbar"
import { CustomSnackbar } from "../CustomSnackbar"
import { useSnackbar } from "@web/hooks"

export default function KonvaMaster() {

	const {
		errors,
		neighborhood,
		changeNeighborhoodName,
		changeBlockName,
		changeLotName,
		changeLotPrice,
		uploadedFile,
		onFileUpload,
		changeLotStatus,
		changeLotSalesman,
		changeLotCustomer
	} = useNeighborhood()
	
	const [selected, setSelected] = useState<SelectedLot | null>(null)
	const [stageScale, setStageScale] = useState(1)
	const [stageX, setStageX] = useState(0)
	const [stageY, setStageY] = useState(0)
	const [open, setOpen] = useState(false)
	const [neighborhoodToUpdate, setNeighborhoodToUpdate] = useState<Neighborhood | null>(null)

	const { openSnackbar, isSnackbarOpen, closeSnackbar } = useSnackbar()

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

	const handleDialogClose = async (event: any) => {

		setOpen(false)

		const { innerText } = event.target
		if (innerText.toUpperCase() === 'CANCELAR') return

		const updatedNeighborhood = mergeObjects(neighborhoodToUpdate, neighborhood)
		
		await updateNeighborhoodInDb(updatedNeighborhood)
		openSnackbar()

	}

	const handleSave = async () => {

		const previousNeighborhood = await getNeighborhoodByName(neighborhood?.name)
		if (!previousNeighborhood ) {
			await addNeighborhood(neighborhood!)
			openSnackbar()
		}
		else {
			setNeighborhoodToUpdate(previousNeighborhood)
			setOpen(true)
		}
	}

	return (
		<MasterContext.Provider
			value={{
				selected,
				setSelected,
				neighborhood,
				changeBlockName,
				changeLotName,
				changeLotPrice,
				changeLotStatus,
				changeLotSalesman,
				changeLotCustomer
			}}
		>

			<CustomSnackbar message={'Guardado con exíto'} open={isSnackbarOpen} handleClose={closeSnackbar} />

			<Box sx={{ 
					width: '100%',
					padding: 2,
					display: 'flex', 
					flexDirection: 'column',
					gap: 2
				}}
			>
				<Dialog open={open}>

					<DialogTitle>Aviso</DialogTitle>

					<DialogContent>
						El barrio {neighborhood?.name} ya existe. ¿Desea actualizarlo con el archivo actual?
					</DialogContent>

					<DialogActions>
						<Button onClick={handleDialogClose}>Cancelar</Button>
						<Button onClick={handleDialogClose} autoFocus>Ok</Button>
					</DialogActions>

				</Dialog>

				{/* Para dibujar los barrios */}
				<KonvaContainer>

					<Paper elevation={3} >

						<ConsoleMasterContainer>
							<FabContainer>
								<Fab 
									disabled={!neighborhood?.name} 
									onClick={handleSave} 
									color='primary'
								>
									<SaveIcon/>
								</Fab>
							</FabContainer>
							<UploadContainer>
								<Typography>{uploadedFile}</Typography>
								<Button component="label" variant="contained" sx={{gap:1}}>
									<UploadFileIcon/>
									Cargar master
									<input type="file" onChange={onFileUpload} hidden />
								</Button>
							</UploadContainer>
						</ConsoleMasterContainer>

						<Stage 
							width={window.innerWidth * 0.98}
							height={window.innerHeight * 0.8492}
							onWheel={handleWheel}
							scaleX={stageScale}
							scaleY={stageScale}
							x={stageX}
							y={stageY}
							draggable={true}
						>
							<Layer>
								{
									neighborhood &&
									neighborhood.blocks.map((block, i) => (
										<KonvaBlock key={i} {...block} block={i} />
									))
								}
								{ errors && <KonvaErrorLines errors={errors} /> }
							</Layer>
						</Stage>
					</Paper>

					<BlockInputsContainer>
						
						{ 
							selected && 
							<React.Fragment>
								<TextField
									label="Barrio"
									size="small"
									placeholder="Ej: Del Pilar, Perdices" 
									value={neighborhood?.name || ""}
									onChange={(e) => {
										changeNeighborhoodName(e.target.value)
									}}
								/>
								<BlockInputs /> 
							</React.Fragment>
						}
					</BlockInputsContainer>

				</KonvaContainer>
			</Box>

		</MasterContext.Provider>
	)
}

const BlockInputsContainer = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: column;
	max-width: 500px;
	
	position: absolute;
	right: 35px;
	bottom: 250px;
	background-color: white;
	padding: 15px;
	border: 1px solid red;
`

const KonvaContainer = styled.div`
	display: flex;
	gap: 20px;
	max-height: ${window.innerHeight * 0.8492}px;
`

const ConsoleMasterContainer = styled.section`
	
	position: absolute;
	right: 45px;
	bottom: 35px;

	display: flex;
	justify-content: 'center';
	align-items: 'center';
	gap: 15px;
	z-index: 800;
`

const FabContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
`
const UploadContainer = styled.div`
	display: flex;
	flex-direction: column;
`