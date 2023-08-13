import { Autocomplete, TextField } from "@mui/material";
import useCollection from "@web/hooks/useCollection";
import { useState } from 'react'

export const CustomerComboBox = ({ table, column, cell, text }) => {

    const [currentValue, setCurrentValue] = useState(cell.getValue())

    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const { isLoading, collection } = useCollection({ name: 'clients' })

    const handleOnChange = (_event, value) => {

        if (!value) return

        setCurrentValue(value)

        setEditingRow({
            ...editingRow,
            _valuesCache: {...editingRow._valuesCache, [column.id]: value}
        })
    }

    return (
        <Autocomplete
            value={currentValue}
            loading={isLoading}
            loadingText="Cargando clientes..."
            options={['- Ninguno -', ...collection]}
            getOptionLabel={(option) => option.fullname || option}
            renderInput={(params) => <TextField {...params} label={ text ? text : 'Cliente' } />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
