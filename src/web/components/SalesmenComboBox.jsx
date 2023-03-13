import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useCollection from '@web/hooks/useCollection'
import { useState } from 'react'

export const SalesmenComboBox = ({ table, column, cell }) => {

    const [currentValue, setCurrentValue] = useState(cell.getValue())
    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const { isLoading, collection } = useCollection({ name: 'salesmen' })

    const handleOnChange = (_event, value) => {

        if (!value) return

        const { fullname } = value

        setCurrentValue(fullname)

        setEditingRow({
            ...editingRow,
            _valuesCache: {...editingRow._valuesCache, [column.id]: fullname}
        })
    }

    return (
        <Autocomplete
            value={currentValue}
            loading={isLoading}
            loadingText="Cargando clientes..."
            options={['- Ninguno -', ...collection]}
            getOptionLabel={(option) => option.fullname || option}
            renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
