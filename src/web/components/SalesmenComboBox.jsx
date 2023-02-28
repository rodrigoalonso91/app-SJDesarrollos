import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useCollection from '@web/hooks/useCollection'

export const SalesmenComboBox = ({ table, row }) => {

    const { original } = row
    const { getState, setEditingRow } = table
    const { editingRow } = getState()
    console.log("🚀 ~ file: SalesmenComboBox.jsx:10 ~ SalesmenComboBox ~ editingRow:", editingRow)

    const { isLoading, collection } = useCollection({ name: 'salesmen' })

    const handleOnChange = (event, value) => {

        if (!value) return

        const { fullname } = value

        const newRow = {
            ...original,
            salesman: fullname
        }

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
            renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
