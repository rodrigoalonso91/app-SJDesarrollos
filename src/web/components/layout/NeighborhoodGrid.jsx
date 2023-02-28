import MaterialReactTable from "material-react-table"
import { CustomerComboBox, SalesmenComboBox, StatusComboBox } from '..'
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useCustomers, useDataSource, useGridTitle, useSalesmen } from '../../hooks'
import { Autocomplete, TextField } from "@mui/material";
import useCollection from "../../hooks/useCollection";

const NEIGHBORHOOD_COLUMNS = [
    { 
        header: 'Manzana',
        accessorKey: 'name',
        Edit: ({ cell }) => <h5>{cell.getValue()}</h5> 
    },
    { 
        header: 'Lote',
        accessorKey: 'lot',
        Edit: ({ cell }) => <h5>{cell.getValue()}</h5> 
    },
    { 
        header: 'Precio',
        accessorKey: 'price',
        Edit: ({cell}) => <TextField inputMode="numeric" label='Precio'>{cell.getValue()}</TextField>
    },
    { 
        header: 'Estado',
        accessorKey: 'status',
        Cell: ({ cell }) => (
            <Box
                component='span'
                sx={{
                    backgroundColor:
                        cell.getValue().toLowerCase() === 'vendido'
                        ? '#e42929'
                        : cell.getValue().toLowerCase() === 'reservado'
                        ? '#decc00'
                        : '#0af2a1',
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        p: '0.25rem',
                }}
            >
                {cell.getValue()}
            </Box>
        ),
        // Edit: ({ cell, column, table }) => <StatusComboBox currentValue={cell.getValue()} />
    },
    {
        header: 'Cliente',
        accessorKey: 'customer',
        Edit: ( props ) => <CustomerComboBox {...props} />
    },
    {
        header: 'Vendedor',
        accessorKey: 'salesman',
        Edit: ( props ) => <SalesmenComboBox {...props} />
    },
];

export const NeighborhoodGrid = ({ data }) => {

    const { name, blocks } = data
    const { getGridTitle } = useGridTitle(name)

    const { clientsCollection, isClientLoading } = useCustomers()
    const { salesmenCollection, isSalesmenLoading } = useSalesmen()

    
    const mappedData = useMemo(
        () => blocks.flatMap( block => {
            return block.lots.map( lt => { 
                return {
                    name: block.name,
                    lot: lt.name,
                    price: lt.price ? `$${lt.price}` : '',
                    status: 'Vendido',
                    customer: lt.customer
                }
        })
    }), [blocks])

    const { dataSource, updateDataSource } = useDataSource({ data: mappedData })

    const handleOnRowSave = ({ row, values, exitEditingMode }) => {

        exitEditingMode()
        const { index } = row

        // api call to update database...
        
        const data = dataSource.map((data, i) => {
            return i === index ? { ...values } : data
        })

        updateDataSource(data)
    }

    

    
    return (
        <MaterialReactTable
            renderTopToolbarCustomActions={getGridTitle}
            columns={NEIGHBORHOOD_COLUMNS}
            data={dataSource}
            enableEditing
            editingMode="modal"
            onEditingRowSave={handleOnRowSave}
            displayColumnDefOptions={{
                'mrt-row-actions': {
                  header: 'Acciones'
            }
            }}
        />
    )
}