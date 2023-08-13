import { Button } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import useImportCsvFile from "../../hooks/useImportCsvFile";

const iconStyle = { mr: "10px" };

export default function AddSheetButton({ text }) {

    const { onFileUpload } = useImportCsvFile()

    return (
        <Button
            variant="contained"
            color="secondary"
            component="label"
        >
            <UploadFileIcon  sx={iconStyle} />
            { text }
            <input type="file" onChange={onFileUpload} accept=".csv" hidden />
        </Button>
    )
}