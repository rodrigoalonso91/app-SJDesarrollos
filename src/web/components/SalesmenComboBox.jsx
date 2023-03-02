import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useCollection from '@web/hooks/useCollection'

export const SalesmenComboBox = ({ table, column }) => {

    const { getState, setEditingRow } = table
    const { editingRow } = getState()

    const { isLoading, collection } = useCollection({ name: 'salesmen' })

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
            renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
