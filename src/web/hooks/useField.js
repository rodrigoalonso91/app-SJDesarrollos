import { useState } from "react"


export const useField = ({ type, label, placeholder }) => {

    const [value, setValue] = useState('')

    const onChange = event => setValue(event.target.value);

    return {
        type,
        value,
        onChange,
        label,
        placeholder
    }
}
