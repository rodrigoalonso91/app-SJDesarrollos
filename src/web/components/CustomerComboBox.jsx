import { Autocomplete, TextField } from "@mui/material";
import useCollection from "@web/hooks/useCollection";

export const CustomerComboBox = ({ table, row, column, cell }) => {

    const { setEditingCell, setEditingRow } = table


    const { loading, options } = useCollection({ collection: 'clients' })

    const handleOnChange = (event, value) => {
        
        const { fullname } = value
        setEditingCell(fullname)
        // console.log(customer.fullname)
        // table.setEditingCell(customer)
    }

    return (
        <Autocomplete
            loading={loading}
            options={options}
            getOptionLabel={(option) => option.fullname}
            renderInput={(params) => <TextField {...params} label={'Cliente'} />}
            onChange={(event, value) => handleOnChange(event, value)}
        />
    )
}
