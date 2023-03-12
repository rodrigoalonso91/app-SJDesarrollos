import { useState } from "react"

export function useSnackbar() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

    const openSnackbar = () => {
        setIsSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    return {
        openSnackbar,
        isSnackbarOpen,
        closeSnackbar
    }
}
