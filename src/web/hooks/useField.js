import { useEffect, useState } from "react"

export const useField = ({ type, label, placeholder, text }) => {

    const [value, setValue] = useState(text || '')

    useEffect(() => { setValue(text || '') }, [text])

    const onChange = event => setValue(event.target.value)

    return {
        type,
        value,
        onChange,
        label,
        placeholder
    }
}
