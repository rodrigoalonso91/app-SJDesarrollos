import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useUserData from "../../src/UseUserData"
import { SalesmenGrid } from "../../src/web/components/salesmen/SalesmenGrid";
import { useMemo } from 'react';
import { Navbar } from '../../src/web/components'
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

    return (
        <>
            <Navbar nickname={ user.nickname }/>
            <SalesmenGrid columns={columns} salesmen={salesmen}/>
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

export default Salesmen;