import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getNeighborhoods } from "@server/index"
import { Box } from "@mui/system"
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import TableChartIcon from '@mui/icons-material/TableChart';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { NeighborhoodGrid } from "../../src/web/components/layout/NeighborhoodGrid"
import styled from "styled-components"
import { useModal, useSelectNeighborhood } from "../../src/web/hooks"
import { Select } from "../../src/web/components/layout"
import deleteNeighborhoodById from "../../src/web/api_calls/neighborhood/deleteNeighborhoodById";
import useUserData from "../../src/web/hooks/UseUserData";
import { Close } from "@mui/icons-material";
import { Layer, Stage } from "react-konva";
import KonvaBlock from "@web/components/master/KonvaBlock"
import { useState } from "react";

export const Neighborhood = ({ neighborhoods }) => {

	const user = useUserData()
	const { openModal, closeModal, isModalOpen} = useModal({ initialValue: false })

	const [stageScale, setStageScale] = useState(1)
	const [stageX, setStageX] = useState(0)
	const [stageY, setStageY] = useState(0)
	
	const { 
		selectedNeighborhoodData,
		updateSelectedNeighborhood,
		selectedNeighborhood,
		clearSelectedNeighborhood,
		neighborhoodsFromDB
	} = useSelectNeighborhood({ neighborhoods })

	const handleChange = (event) => {
		const value = event.target.value
		updateSelectedNeighborhood({ value });
	};

	const handleDeleteNeighborhood = async () => {
		
		if (!selectedNeighborhood || !selectedNeighborhoodData) return
		if (!confirm(`Desea eliminar el barrio ${selectedNeighborhoodData.name}?`)) return

		const id = selectedNeighborhood
		clearSelectedNeighborhood()
		await deleteNeighborhoodById(id)
	}

	const handleClick = () => {
		openModal()
	}

	const handleWheel = (e) => {
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
		<Page>

			<Dialog open={isModalOpen} fullScreen>

				<AppBar sx={{ position: 'relative', backgroundColor: '#212429' }}>
					<Toolbar>
						<IconButton
							edge="end"
							color="inherit"
							onClick={() => closeModal()}
							aria-label="close"
						>
							<Close/>
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{selectedNeighborhoodData.name}
						</Typography>
					</Toolbar>
				</AppBar>

				<DialogTitle>
					
				</DialogTitle>

				<DialogContent>

					<Stage
						width={window.innerWidth}
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
								selectedNeighborhoodData &&
								selectedNeighborhoodData.blocks.map((block, i) => (
									<KonvaBlock key={i} {...block} block={i} />
								))
							}
							{/* { errors && <KonvaErrorLines errors={errors} /> } */}
						</Layer>
					</Stage>
					
				</DialogContent>

				{/* <DialogActions>
					<Button onClick={() => closeModal()}>Cerrar</Button>
				</DialogActions> */}
			</Dialog>

			<Box sx={{display: 'flex', flexDirection: 'row-reverse', gap: 5}}>
				
				<Select collection={neighborhoodsFromDB} value={selectedNeighborhood} handleChange={handleChange} />
				
				<Tooltip title='Ver Master'>
					<Button color='success' variant="contained" onClick={handleClick}>
						<TableChartIcon/>
					</Button>
				</Tooltip>

				{
					user.isAdmin &&
					<Tooltip title='Eliminar barrio'>
						<Button variant="contained" color="error" onClick={handleDeleteNeighborhood}>
							<LayersClearIcon/>
						</Button>
					</Tooltip>
				}
				
			</Box>
			<NeighborhoodGrid data={selectedNeighborhoodData} />
		</Page>
	)
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})

const Page = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;
	padding: 25px
`;