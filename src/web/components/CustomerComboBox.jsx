import { Autocomplete, TextField } from "@mui/material";
import useCollection from "@web/hooks/useCollection";

export const CustomerComboBox = ({ table, row, cell, column }) => {
    console.log("🚀 ~ file: CustomerComboBox.jsx:5 ~ CustomerComboBox ~ column:", column)
    
    const { original } = row
    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const { isLoading, collection } = useCollection({ name: 'clients' })

    const handleOnChange = (event, value) => {

        if (!value) return

        const { fullname } = value

        const newRow = {
            ...original,
            customer: fullname
        }
        cell.renderValue(column.id)

        setEditingRow({
            ...editingRow,
            _valuesCache: {...newRow}
        })

    }

    return (
        <Autocomplete
            loading={isLoading}
            options={collection}
            getOptionLabel={(option) => option.fullname}
            renderInput={(params) => <TextField {...params} label={'Cliente'} />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
