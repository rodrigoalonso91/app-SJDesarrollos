import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export const SalesmenComboBox = () => {

    const [options, setOptions] = useState({})

    useEffect(() => {
        fetch('api/salesmen').then( customer => console.log(customer) )
    },[options])

    return (
        <Autocomplete
            options={options}
            renderInput={(params) => <TextField {...params} label={'Vendedor'} />}
        />
    )
}
