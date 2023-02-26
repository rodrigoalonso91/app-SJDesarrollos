import { Box, MenuItem, TextField } from "@mui/material";

export function Select({ collection, handleChange, value }) {

    return (
        <Box width="250px">
            <TextField
                label='Elige un barrio'
                select
                value={value}
                onChange={handleChange}
                fullWidth
            >
                {
                    collection.map(n => 
                        <MenuItem key={n.id} value={n.id}>
                            {n.name}
                        </MenuItem>
                    )
                }
            </TextField>
        </Box>
    )
}
