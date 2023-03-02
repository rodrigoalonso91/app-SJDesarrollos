import { Autocomplete, TextField } from "@mui/material";
import useCollection from "@web/hooks/useCollection";

export const CustomerComboBox = ({ table, column }) => {
    
    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const { isLoading, collection } = useCollection({ name: 'clients' })

    const handleOnChange = (event, value) => {

        if (!value) return

        const { fullname } = value

        setEditingRow({
            ...editingRow,
            _valuesCache: {...editingRow._valuesCache, [column.id]: fullname}
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
