import { PersonAdd } from '@mui/icons-material';
import MaterialReactTable from 'material-react-table';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import updateRowOnDatabase from '../../../helpers/updateRowOnDatabase';
import { BasicEditActions } from '../table/BasicEditActions';


export const CustomGrid = ({ collection, columns, data }) => {

    const [tableData, setTableData] = useState(data)

    const dispatch = useDispatch();
    const handleClick = () => { dispatch(displayForm(true)) }

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {

        const { id } = row.original

        const record = {
            id,
            values: {...values}
        }
        
        await updateRowOnDatabase(collection, record);

        const data = tableData.map(data =>
            data.id === id
                ? { id, ...values }
                : data
        )

        exitEditingMode();

        setTableData(data);
    };

    return (
        <>
            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button
                    className='btn btn-primary mb-3 me-3'
                    onClick={ handleClick }
                >
                    <PersonAdd sx={{ mr: '10px' }} />
                    Agregar
                </button>
            </div>

            <MaterialReactTable

                columns={columns}
                data={tableData}
                initialState={{ columnVisibility: { id: false } }}

                enableColumnOrdering={false}
                enableGlobalFilter={false} //turn off a feature
                enableEditing
                editingMode="modal"

                onEditingRowSave={ handleSaveRowEdits }

                // renderRowActions={({ row, table }) => (
                //     <BasicEditActions row={row} table={table} handleDeleteRow={ handleDeleteRow } />
                // )}
            />
        </>
    )
}
