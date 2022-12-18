import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Navbar } from '../../src/web/components'
import useUserData from "../../src/UseUserData"
import { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { getSalesmen } from '../../src/GetSalesmen'

export const Salesmen = ({ salesmen }) => {

    const user = useUserData();

    const columns = useMemo(
        () => [
          { header: 'Nombre', accessorKey: 'firstname'},
          { header: 'Apellido', accessorKey: 'lastname'},
          { header: 'Teléfono', accessorKey: 'phone'},
          { header: 'Email', accessorKey: 'email'}
        ],
        [],
    );

    const handleClick = async () => {

        await fetch(`/api/salesmens`, { method: "POST", body: JSON.stringify({
            firstname: 'Rodrigo',
            lastname: 'Alonso',
            phone: '123456',
            email: 'rodrigo@email.com'
        })})
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

            <MaterialReactTable
                columns={columns}
                data={salesmen}
                enableRowSelection
                enableColumnOrdering
                enableGlobalFilter={false} //turn off a feature
            />
        </>
    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async () => {

        const salesmen = await getSalesmen();
        return {
            props: { salesmen }
        }
    }
})

export default Salesmen