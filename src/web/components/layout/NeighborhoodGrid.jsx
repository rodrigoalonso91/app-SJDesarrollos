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
        Edit: ({ cell }) => <h4>{cell.getValue()}</h4> 
    },
    { 
        header: 'Lote',
        accessorKey: 'lot',
        Edit: ({ cell }) => <h4>{cell.getValue()}</h4> 
    },
    { 
        header: 'Precio',
        accessorKey: 'price',
        Edit: ({cell}) => <TextField label='Precio'>{cell.getValue()}</TextField>
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
        // Edit: ({ table, row, cell }) => (
        //     <Autocomplete
        //         options={clientsCollection}
        //         loading={isClientLoading}
        //         renderInput={(params) => <TextField {...params} label={'Cliente'} />}
        //     />
        // )
    },
    {
        header: 'Vendedor',
        accessorKey: 'salesman',
        Edit: ( props ) => <CustomerComboBox {...props} />
    },
];

// const NEIGHBORHOOD_COLUMNS = [
//     { 
//         header: 'Manzana',
//         accessorKey: 'name'
//     },
//     { 
//         header: 'Lote',
//         accessorKey: 'lot'
//     },
//     { 
//         header: 'Precio',
//         accessorKey: 'price'
//     },
//     { 
//         header: 'Estado',
//         accessorKey: 'status'
//     },
//     {
//         header: 'Cliente',
//         accessorKey: 'customer'
//     },
//     {
//         header: 'Vendedor',
//         accessorKey: 'salesman'
//     },
// ];

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
                    price: '$100',
                    status: 'Vendido',
                    customer: lt.customer
                }
        })
    }), [blocks])

    const { dataSource, updateDataSource } = useDataSource({ data: mappedData })

    const handleOnRowSave = ({ values, exitEditingMode }) => {

        console.log("🚀 ~ file: NeighborhoodGrid.jsx:119 ~ handleOnRowSave ~ values:", values)

        exitEditingMode()
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