import { PersonAdd } from '@mui/icons-material';
import { Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteRowOnDatabase from '../../../helpers/deleteRowOnDatabase';
import updateRowOnDatabase from '../../../helpers/updateRowOnDatabase';
import { displayForm } from '../../../store/form';
import { BasicEditActions } from '../table/BasicEditActions';
import { CustomModal } from './CustomModal';
import { AddForm } from '../AddForm'

const esCollections = {
    salesmen: 'Vendedores',
    clients: 'Clientes'
};

export const CustomGrid = ({ collection, columns, data }) => {

    const [tableData, setTableData] = useState(data);

    const { isFormActivated } = useSelector(state => state.isActivatedForm);

    const dispatch = useDispatch();
    const handleClick = () => { dispatch(displayForm(true)) }

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {

        const { id } = row.original

        const record = {
            id,
            values: { ...values }
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

    const handleDeleteRow = useCallback(
        async (row) => {

            const { firstname, lastname, id } = row.original;

            if (!confirm(`Desea eliminar a ${firstname} ${lastname}?`)) return;

            await deleteRowOnDatabase(collection, id);
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData]
    );

    return (
        <>
            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button
                    className='btn btn-primary mb-3 me-3'
                    onClick={handleClick}
                >
                    <PersonAdd sx={{ mr: '10px' }} />
                    Agregar
                </button>
            </div>

            <div style={{ padding: 15 }} >
                <MaterialReactTable

                    style={{ boxShadow: '3px 4.5px 9.5px 3.5px #dddddd' }}
                    columns={columns}
                    data={tableData}
                    initialState={{ columnVisibility: { id: false } }}

                    enableColumnOrdering={false}
                    enableGlobalFilter={false} //turn off a feature
                    enableEditing
                    editingMode="modal"

                    positionActionsColumn="first"

                    onEditingRowSave={handleSaveRowEdits}

                    renderTopToolbarCustomActions={() => (
                        <Typography sx={{ ml: 1 }} variant='h5' >
                            {esCollections[collection]}
                        </Typography>
                    )}

                    renderRowActions={({ row, table }) => (
                        <BasicEditActions row={row} table={table} handleDeleteRow={handleDeleteRow} />
                    )}
                />
            </div>

            {
                isFormActivated && 
                <CustomModal headerText={ `Agregar ${esCollections[collection]}` }>
                    <AddForm collection={collection} data={tableData} setData={setTableData} />
                </CustomModal>
            }

        </>
    )
}
