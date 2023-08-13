import { Box } from "@mui/material";
import { CustomerComboBox, SalesmenComboBox, StatusComboBox } from "../components";
import { STATUS_COLORS, STATUS_OPTIONS } from "./lotStatus";
import { AdministratorComboBox } from "../components/AdministradorComboBox";

export const NEIGHBORHOOD_COLUMNS = [
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
                    backgroundColor: STATUS_COLORS[cell.getValue().replace(' ', '')],
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        p: '0.25rem',
                }}
            >
                {cell.getValue()}
            </Box>
        ),
        filterVariant: 'multi-select',
        filterSelectOptions: STATUS_OPTIONS,
    },
    {
        header: 'Administrador',
        accessorKey: 'administrator',
        Cell: ({ cell }) => {
            const value = cell.getValue()
            return ( value?.fullname )
        },
        Edit: ( props ) => <AdministratorComboBox {...props} />,
        filterFn: (row, id, filterValue) => {
            return neighborhoodPeopleFilter({ row, id, filterValue })
        }
    },
    {
        header: 'Propietario',
        accessorKey: 'customer',
        Cell: ({ cell }) => {
            const value = cell.getValue()
            return ( value?.fullname )
        },
        Edit: ( props ) => <CustomerComboBox {...props} />,
        filterFn: (row, id, filterValue) => {
            return neighborhoodPeopleFilter({ row, id, filterValue })
        }
    },
    {
        header: 'Co-Propietario',
        accessorKey: 'coCustomer',
        Cell: ({ cell }) => {
            const value = cell.getValue()
            return ( value?.fullname )
        },
        Edit: ( props ) => <CustomerComboBox {...props} text='Co-Propietario' />,
        filterFn: (row, id, filterValue) => {
            return neighborhoodPeopleFilter({ row, id, filterValue })
        }
    },
    {
        header: 'Vendedor',
        accessorKey: 'salesman',
        Cell: ({ cell }) => {
            const value = cell.getValue()
            return ( value?.fullname )
        },
        Edit: ( props ) => <SalesmenComboBox {...props} />,
        filterFn: (row, id, filterValue) => {
            return neighborhoodPeopleFilter({ row, id, filterValue })
        }
    },
    {
        header: 'Detalles',
        accessorKey: 'details',
    },
];

function neighborhoodPeopleFilter({ row, id, filterValue }) {
    const value = row.getValue(id)
    const fullname = value?.fullname.toLowerCase()
    const filterValueLowerCase = filterValue.toLowerCase()
    return fullname?.includes(filterValueLowerCase)
}