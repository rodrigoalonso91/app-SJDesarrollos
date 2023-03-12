import { Alert, Snackbar } from "@mui/material";

export function CustomSnackbar({ open, handleClose, message }) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
