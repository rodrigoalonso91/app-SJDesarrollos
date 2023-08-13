export const BASIC_COLUMNS = [
    { header: 'Nombre', accessorKey: 'firstname' },
    { header: 'Apellido', accessorKey: 'lastname' },
    { header: 'Teléfono', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' }
];

export const CUSTOMER_COLUMNS = [ 
    ...BASIC_COLUMNS, 
    { header: 'Empresa', accessorKey: 'company' }
]

const colorRowStyle = {
    border: 'solid 1px black',
    borderRadius: '0.30rem',
    color: '#fff',
    padding: '2%',
}

export const ADMINISTRATOR_COLUMNS = [ 
    ...BASIC_COLUMNS, 
    { 
        header: 'Color',
        accessorKey: 'color',
        Cell: ({ cell }) => {

            const color = cell.getValue()
            return (
                <span 
                    style={{
                        ...colorRowStyle, 
                        backgroundColor: `${color ? color : '#000000'}`
                    }}
                >
                    {color ? color : 'Sin color'}
                </span>
            )
        },
        muiTableBodyCellEditTextFieldProps: {
            required: false,
            type: 'color',
            variant: 'outlined',
        },
    }
]