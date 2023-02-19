import { Select } from "@mui/material";
import { Box } from "@mui/system";
import MaterialReactTable from "material-react-table"
import { useMemo } from "react";
import { useGridTitle } from '../../hooks/'
import { SalesmenComboBox } from '../../components'

const NEIGBORHOOD_COLUMS = [
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
        accessorKey: 'price' 
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
        Edit: ({ cell, column, table }) => <Select />
    },
    {
        header: 'Cliente',
        accessorKey: 'customer'
    },
    {
        header: 'Vendedor',
        accessorKey: 'salesman',
        Edit: ({ cell }) => <SalesmenComboBox currentValue={cell.getValue()} />
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
            columns={NEIGBORHOOD_COLUMS}
            data={dataSource}
            enableEditing
            editingMode="modal"
        />
    )
}