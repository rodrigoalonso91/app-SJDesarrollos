import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'

const STATUS_OPTIONS = [
    'Disponible',
    'Vendido',
    'Reservado'
];

export const StatusComboBox = ({ table, column }) => {

    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const handleOnChange = (event, value) => {

        if (!value) return

        setEditingRow({
            ...editingRow,
            _valuesCache: {...editingRow._valuesCache, [column.id]: value}
        })
    }

    return (
        <Autocomplete
            options={STATUS_OPTIONS}
            onChange={handleOnChange}
            renderInput={(params) => <TextField {...params} label={'Estado'} />}
        />
    )
}
