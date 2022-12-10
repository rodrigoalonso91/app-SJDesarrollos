import { Navbar } from '../src/web/components'
import useUserData from "../src/UseUserData"
import { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const data = [
    { id: 0, firstname: 'Tony', lastname: 'Stark', phone: '123456', email: 'tony@email.com' },
    { id: 1, firstname: 'Steven', lastname: 'Strange', phone: '123456', email: 'steven@email.com' },
    { id: 2, firstname: 'Thor', lastname: 'Odinson', phone: '123456', email: 'thor@email.com' },
    { id: 3, firstname: 'Petter', lastname: 'Parker', phone: '123456', email: 'petter@email.com' },
];

export const Salesman = () => {

    const user = useUserData();

    const columns = useMemo(
        () => [
          { header: 'ID', accessorKey: 'id' },
          { header: 'Nombre', accessorKey: 'firstname'},
          { header: 'Apellido', accessorKey: 'lastname'},
          { header: 'Teléfono', accessorKey: 'phone'},
          { header: 'Email', accessorKey: 'email'}
        ],
        [],
    );

    const handleClick = () => alert('Not implemented');

    return (
        <>
            <Navbar nickname={ user.nickname }/>

            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button
                  className='btn btn-primary mb-3 me-3'
                  onClick={handleClick}
                >
                    + Vendedor</button>
            </div>

            <MaterialReactTable
                columns={columns}
                data={data}
                enableRowSelection
                enableColumnOrdering
                enableGlobalFilter={false} //turn off a feature
            />

        </>
    )
}

export default Salesman