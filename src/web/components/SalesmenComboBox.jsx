import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import getAllOnDatabase from '../api_calls/getAllOnDatabase'

export const SalesmenComboBox = () => {

    const [options, setOptions] = useState([])
    const loading = options.length === 0;

    useEffect(() => {

        getAllOnDatabase('salesmen')
            .then(res => res.json())
            .then(data => {
                const salesmen = data.map( salesman => {
                    return {
                        id: salesman.id,
                        fullname: `${salesman.firstname} ${salesman.lastname}`
                    }
                })
                setOptions(salesmen)
            })

    }, [])

    return (
        <Autocomplete
            loading={loading}
            options={options}
            getOptionLabel={(option) => option.fullname}
            renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
        />
    )
}
