import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import SyncAltSharpIcon from '@mui/icons-material/SyncAltSharp';

export const AdministratorEditActions = ({ row, table, handleDeleteRow, handleUpdateColorInNeighborhood }) => {
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

            <Tooltip arrow placement="right" title="Actualizar en barrios">
                <IconButton color="secondary" onClick={() => handleUpdateColorInNeighborhood(row)}>
                    <SyncAltSharpIcon />
                </IconButton>
            </Tooltip>

        </Box>
    )
}
