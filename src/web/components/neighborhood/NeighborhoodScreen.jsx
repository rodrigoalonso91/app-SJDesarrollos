import styled from 'styled-components';
import TableChartIcon from '@mui/icons-material/TableChart';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { useModal, useSelectNeighborhood } from '../../hooks'
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Layer, Stage } from 'react-konva';
import NeighborhoodKonvaBlock from './NeighborhoodKonvaBlock';
import { useState } from 'react';
import deleteNeighborhoodById from '../../api_calls/neighborhood/deleteNeighborhoodById';
import useUserData from '../../hooks/UseUserData';
import { Select } from "../layout"
import { NeighborhoodGrid } from '../layout/NeighborhoodGrid';

export default function NeighborhoodScreen({ neighborhoods }) {

    const [stageScale, setStageScale] = useState(1)
	const [stageX, setStageX] = useState(0)
	const [stageY, setStageY] = useState(0)

    const user = useUserData()
    const { openModal, closeModal, modal } = useModal({ initialValue: false })

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

		if (!selectedNeighborhood || !selectedNeighborhoodData) {
            alert("Primero debe seleccionar un barrio")
            return
        }
		if (!confirm(`Desea eliminar el barrio ${selectedNeighborhoodData.name}?`)) return

		const id = selectedNeighborhood
		clearSelectedNeighborhood()
		await deleteNeighborhoodById(id)
	}

	const viewNeighborhoodByStatus = () => {
        if (!selectedNeighborhood) {
            alert("Primero debe seleccionar un barrio")
            return
        }
		openModal({ id: 1 })
	}

    const viewNeighborhoodByAdministrators = () => {
        if (!selectedNeighborhood) {
            alert("Primero debe seleccionar un barrio")
            return
        }
        openModal({ id: 2 })
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
            <Dialog open={modal.isOpen && modal.id === 1} fullScreen>

                <AppBar sx={{ position: "relative", backgroundColor: "#212429" }}>
                    <Toolbar>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => closeModal({ id: 1 })}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>

                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {`${selectedNeighborhoodData.name} - Estados de lotes`}
                        </Typography>
                    </Toolbar>
                </AppBar>

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
                                    <NeighborhoodKonvaBlock
                                        key={`${block.name}-${i}`}
                                        block={block}
                                    />
                                ))
                            }
                        </Layer>
                    </Stage>
                </DialogContent>

            </Dialog>

            <Dialog open={modal.isOpen && modal.id === 2} fullScreen>

                <AppBar sx={{ position: "relative", backgroundColor: "#212429" }}>
                    <Toolbar>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => closeModal({ id: 2 })}
                            aria-label="close"
                        >
                        <Close />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {`${selectedNeighborhoodData.name} - Administradores`}
                        </Typography>
                    </Toolbar>
                </AppBar>

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
                                    <NeighborhoodKonvaBlock
                                        key={`${block.name}-${i}`}
                                        block={block}
                                        administratorView
                                    />
                                ))
                            }
                        </Layer>
                    </Stage>
                </DialogContent>

            </Dialog>

            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 5 }}>
                <Select collection={neighborhoodsFromDB} value={selectedNeighborhood} handleChange={handleChange} />
                <Tooltip title="Ver Master">
                    <Button color="success" variant="contained" onClick={viewNeighborhoodByStatus}>
                        <TableChartIcon />
                    </Button>
                </Tooltip>
                {
                    user.isAdmin &&
                    <Tooltip title="Eliminar barrio">
                        <Button variant="contained" color="error" onClick={handleDeleteNeighborhood}>
                            <LayersClearIcon />
                        </Button>
                    </Tooltip>

                }
                {
                    user.isAdmin &&
                    <Tooltip title="Ver administradores">
                        <Button variant="contained" color="secondary" onClick={viewNeighborhoodByAdministrators}>
                            <CoPresentIcon />
                        </Button>
                    </Tooltip>
                }
            </Box>

            <NeighborhoodGrid
                data={selectedNeighborhoodData}
            />
        </Page>
    )
}

const Page = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;
	padding: 25px;
`;