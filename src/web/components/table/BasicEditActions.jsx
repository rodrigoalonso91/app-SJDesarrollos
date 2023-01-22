import { Delete, Edit } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"

export const BasicEditActions = ({ row, table, handleDeleteRow }) => {

    return (
        <Box sx={{ display: 'flex', gap: '1rem' }} >
            <Tooltip arrow placement="left" title="Editar" >
                <IconButton onClick={() => table.setEditingRow(row)} >
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Borrar">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    )
}