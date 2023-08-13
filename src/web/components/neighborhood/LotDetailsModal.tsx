import { Box, Modal } from '@mui/material'
import React from 'react'

interface Props {
    isOpen: boolean
}

export const LotDetailsModal: React.FC<Props> = ({ isOpen }) => {
    return (
        <Modal
            open={isOpen}
        >
            <Box sx={modalStyle}>
                <h1>Hola desde el modal</h1>
            </Box>
        </Modal>
    )
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};