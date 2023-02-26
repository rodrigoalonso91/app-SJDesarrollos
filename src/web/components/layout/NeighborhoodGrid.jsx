import MaterialReactTable from "material-react-table"
import { CustomerComboBox, SalesmenComboBox, StatusComboBox } from '../../components'
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useGridTitle } from '../../hooks/'
import { TextField } from "@mui/material";

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
        Edit: ({ cell, column, table }) => <StatusComboBox currentValue={cell.getValue()} />
    },
    {
        header: 'Cliente',
        accessorKey: 'customer',
        Edit: () => <CustomerComboBox />
    },
    {
        header: 'Vendedor',
        accessorKey: 'salesman',
        Edit: ({ cell }) => <SalesmenComboBox currentValue={() => cell.getValue()} />
    },
];

export const NeighborhoodGrid = ({ data }) => {

    const { name, blocks } = data
    const { getGridTitle } = useGridTitle(name)

    const dataSource = useMemo(
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
    
    return (
        <MaterialReactTable
            renderTopToolbarCustomActions={getGridTitle}
            columns={NEIGHBORHOOD_COLUMNS}
            data={dataSource}
            enableEditing
            editingMode="modal"
        />
    )
}