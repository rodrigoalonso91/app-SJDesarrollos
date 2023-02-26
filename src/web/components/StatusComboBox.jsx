import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react';

const options = [
    'Disponible',
    'Vendido',
    'Reservado'
];

export const StatusComboBox = ({ currentValue }) => {

    const [selected, setSelected] = useState(currentValue)

    return (
        <Autocomplete
            value={selected}
            options={options}
            onChange={ (event, newValue) =>  setSelected(newValue)}
            renderInput={(params) => <TextField {...params} label={'Estado'} />}
        />
    )
}
