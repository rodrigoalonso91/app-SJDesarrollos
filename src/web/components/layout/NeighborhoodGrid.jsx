import MaterialReactTable from "material-react-table"
import { CustomerComboBox, SalesmenComboBox, StatusComboBox } from '..'
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { useDataSource, useGridTitle } from '../../hooks'
import updateRowOnDatabase from "../../api_calls/updateRowOnDatabase";
import useUserData from "../../hooks/UseUserData";
import { STATUS_COLORS } from "../../constants/lotStatus";

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
        muiTableBodyCellEditTextFieldProps: {
            required: false,
            type: 'number',
            variant: 'outlined',
        },
        Cell: ({ cell }) => {
            return cell.getValue()
            ? <span>US$ <strong>{`${cell.getValue()}`}</strong></span>
            : null
        },
        sortingFn: (rowA, rowB, columnId) => {

            const valueA = +rowA.getValue(columnId)
            const valueB = +rowB.getValue(columnId)
            
            return valueA > valueB 
                ? -1
                : valueB > valueA
                    ? 1
                    : 0
        }
    },
    { 
        header: 'Estado',
        accessorKey: 'status',
        Edit: (props) => <StatusComboBox {...props} />,
        Cell: ({ cell }) => (
            <Box
                component='span'
                sx={{
                    backgroundColor: STATUS_COLORS[cell.getValue()],
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        p: '0.25rem',
                }}
            >
                {cell.getValue()}
            </Box>
        )
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

const updateLot = ({ block, lotName, values }) => {

    const lot = block.lots.find((l) => l.name === lotName);

    if (!lot) return {}

    delete values.lot
    return { ...lot, ...values }
}

export const NeighborhoodGrid = ({ data }) => {

    const { name, blocks } = data
    const { getGridTitle } = useGridTitle(name)
    const [isLoading, setIsLoading] = useState(false)
    const user = useUserData()
    
    const mappedData = useMemo(
        () => blocks?.flatMap( block => {
            return block.lots.map( lt => { 
                return {
                    name: block.name,
                    lot: lt.name,
                    price: lt.price ? `${lt.price}` : '',
                    status: lt.status ? lt.status : 'Disponible',
                    customer: lt.customer,
                    salesman: lt.salesman
                }
        })
    }), [blocks])

    const { dataSource, updateDataSource } = useDataSource({ data: mappedData })

    const handleOnRowSave = async ({ row, values, exitEditingMode }) => {

        setIsLoading(true)
        exitEditingMode()
        const { index } = row
        
        const lot = { ...values }
        delete lot.name

        const dataToUpdate = { ...data }
        dataToUpdate.blocks = dataToUpdate.blocks.map( block => {

            if (block.name !== values.name) {
                return block
            }

            const newLot = updateLot({ block, lotName: values.lot, values: lot })
            const lotIndex = block.lots.findIndex( lt => lt.name === newLot.name )

            block.lots[lotIndex] = newLot
            return {
                ...block
            }
        })

        await updateRowOnDatabase('neighborhoods', dataToUpdate)
        
        const newData = dataSource.map((data, i) => {
            return i === index ? { ...values } : data
        })

        updateDataSource(newData)
        setIsLoading(false)
    }
    
    return (
        <MaterialReactTable
            state={{ isLoading }}
            renderTopToolbarCustomActions={getGridTitle}
            initialState={{ columnVisibility: { customer: !user.isSalesman } }}
            columns={NEIGHBORHOOD_COLUMNS}
            data={dataSource ?? []}
            enableEditing={user.isAdmin}
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