import { Typography } from "@mui/material"
import { useEffect, useState } from "react"

export const useGridTitle = (title = '') => {

    const [gridTitle, setGridTitle] = useState()

    useEffect( () => {
        setGridTitle(title)
    }, [title] )

    const getGridTitle = () => {
        return (
            <Typography sx={{ ml: 1 }} variant="h6">{gridTitle}</Typography>
        )
    }

    return {
        getGridTitle
    }
}
