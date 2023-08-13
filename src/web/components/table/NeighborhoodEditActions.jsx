import { Edit, Input } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

export const NeighborhoodEditActions = ({ row, table, setIsModalOpen }) => {
    return (
        <Box sx={{ display: 'flex', gap: '1rem' }} >

            <Tooltip arrow placement="left" title="Editar" >
                <IconButton onClick={() => table.setEditingRow(row)} >
                    <Edit />
                </IconButton>
            </Tooltip>

            <Tooltip arrow placement="right" title="Actualizar en barrios">
                <IconButton color="secondary" onClick={() => setIsModalOpen(true)}>
                    <Input />
                </IconButton>
            </Tooltip>

        </Box>
    )
}