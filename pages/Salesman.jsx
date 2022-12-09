import { Navbar } from './components'
import useUserData from "../src/UseUserData"
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useState } from 'react';

const testColumns = [
    { key: 'id', name: 'ID' },
    { key: 'firstname', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
    { key: 'phone', name: 'Teléfono' },
    { key: 'email', name: 'Email' },
]

const testRows = [
    { id: 0, firstname: 'Tony', lastname: 'Stark', phone: '123456', email: 'tony@email.com' },
    { id: 1, firstname: 'Steven', lastname: 'Strange', phone: '123456', email: 'steven@email.com' },
    { id: 2, firstname: 'Thor', lastname: 'Odinson', phone: '123456', email: 'thor@email.com' },
    { id: 3, firstname: 'Petter', lastname: 'Parker', phone: '123456', email: 'petter@email.com' },
];

export const Salesman = () => {

    const user = useUserData();
    const [rows, setRows] = useState(testRows);

    const handleClick = () => {

        const newrow = [
            ...rows,
            { id: rows.length, firstname: 'Rodrigo', lastname: 'Alonso', telefono: '123456', email: 'rodrigo@email.com' }
        ];
        setRows(newrow);
    };

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

            <DataGrid columns={testColumns} rows={rows} rowHeight={ () => 30 }/>
        </>
    )
}

export default Salesman