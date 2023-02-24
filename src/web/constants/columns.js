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