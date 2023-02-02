import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useUserData from "../../src/hooks/UseUserData"
import { Navbar } from '../../src/web/components'
import { CustomGrid } from '../../src/web/components/layout/CustomGrid';

import { useMemo } from 'react';
import { getCustomers } from '../../src/server';

export const Clients = ({ customers }) => {

    const user = useUserData();

    const columns = useMemo(
        () => [
          { header: 'Nombre', accessorKey: 'firstname' },
          { header: 'Apellido', accessorKey: 'lastname' },
          { header: 'Teléfono', accessorKey: 'phone' },
          { header: 'Email', accessorKey: 'email' }
        ],
        [],
    );
    
    return (
        <>
            <Navbar nickname={ user.nickname }/>
            <CustomGrid collection="clients" columns={columns} data={customers} />
            {/* {
                isFormActivated
                ? <AddSalesmanForm />
                : <CustomGrid collection="clients" columns={columns} data={customers} />
            } */}
        </>
    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async () => {

        const customers = await getCustomers();
        return {
            props: { customers }
        }
    }
})

export default Clients