import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import getAllOnDatabase from '../api_calls/getAllOnDatabase'

export const CustomerComboBox = ({table, row, cell}) => {

    const [options, setOptions] = useState([])
    const loading = options.length === 0;

    useEffect(() => {

        getAllOnDatabase('clients')
            .then(res => res.json())
            .then(data => {
                const customers = data.map( customer => {
                    return {
                        id: customer.id,
                        fullname: `${customer.firstname} ${customer.lastname}`
                    }
                })
                setOptions(customers)
            })
    }, [])

    const handleOnChange = (event, customer) => {
        console.log(event)
        console.log(customer.fullname)
        table.setEditingCell(customer)
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
