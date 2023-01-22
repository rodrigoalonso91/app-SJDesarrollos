import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useUserData from "../../src/UseUserData"
import { useEffect, useMemo } from 'react';
import { getSalesmen } from '../../src/GetSalesmen'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../src/web/components'
import { CustomGrid } from '../../src/web/components/layout';
import { displayForm } from '../../src/store/form';
import { AddSalesmanForm } from './../../src/web/components/salesmen'


export const Salesmen = ({ salesmen }) => {

    const user = useUserData();
    
    const dispatch = useDispatch();
    useEffect(() => { dispatch( displayForm(false) ) }, []);
    
    const { isFormActivated } = useSelector( state => state.isActivatedForm );
    
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
            {
                isFormActivated
                ? <AddSalesmanForm />
                : <CustomGrid collection="salesmen" columns={columns} data={salesmen} />
            }
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