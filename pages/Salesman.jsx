import { Navbar } from './components'
import useUserData from "../src/UseUserData"
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

const testColumns = [
    { key: 'id', name: 'ID' },
    { key: 'firstname', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
    { key: 'telefono', name: 'Teléfono' },
    { key: 'email', name: 'Email' }
]

const testRows = [
    { id: 0, firstname: 'Tony', lastname: 'Stark', telefono: '123456', email: 'tony@email.com' },
    { id: 0, firstname: 'Steven', lastname: 'Strange', telefono: '123456', email: 'steven@email.com' },
    { id: 0, firstname: 'Thor', lastname: 'Odinson', telefono: '123456', email: 'thor@email.com' },
    { id: 0, firstname: 'Petter', lastname: 'Parker', telefono: '123456', email: 'petter@email.com' },
];

export const Salesman = () => {

    const user = useUserData()

    return (
        <>
            <Navbar nickname={ user.nickname }/>

            <div className="contairner d-flex flex-row-reverse align-items-center">
                <button
                  className='btn btn-primary mb-3 me-3'
                >
                    + Vendedor</button>
            </div>

            <DataGrid columns={testColumns} rows={testRows} />
        </>
    )
}

export default Salesman