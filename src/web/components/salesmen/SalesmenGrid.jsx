import { useDispatch } from 'react-redux';
import MaterialReactTable from 'material-react-table';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { displayForm } from './../../../store/form'

export const SalesmenGrid = ({columns, salesmen}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( displayForm(true) )
    }

    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        
        const { id } = row.original

        await fetch('api/salesmen', 
        { 
            method: "PUT",
            body: JSON.stringify(
                {
                    id,
                    values: {...values}
                }
            ), 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        exitEditingMode();
    };

    

    return (
        <>
            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button
                    className='btn btn-primary mb-3 me-3' 
                    onClick={ handleClick }
                >
                    <PersonAddIcon sx={{mr: '10px'}}/>
                    Crear vendedor
                </button>
            </div>

            <MaterialReactTable
                columns={columns}
                data={salesmen}
                enableColumnOrdering={false}
                enableGlobalFilter={false} //turn off a feature
                enableEditing
                editingMode="row"
                onEditingRowSave={ handleSaveRow }
                initialState={{ columnVisibility: { id: false } }}
            />
        </>
    )
}