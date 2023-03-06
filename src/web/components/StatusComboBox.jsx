import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import { STATUS_OPTIONS } from '../constants/lotStatus'

export const StatusComboBox = ({ table, column, cell }) => {

    const [currentValue, setCurrentValue] = useState(cell.getValue())
    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const handleOnChange = (event, value) => {

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
            options={STATUS_OPTIONS}
            onChange={handleOnChange}
            renderInput={(params) => <TextField {...params} label={'Estado'} />}
        />
    )
}