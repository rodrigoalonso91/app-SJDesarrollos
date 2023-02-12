import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useUserData from "../../src/hooks/UseUserData"
import { getSalesmen } from '../../src/server/salesmen/GetSalesmen'
import { Navbar } from '../../src/web/components'
import { CustomGrid } from '../../src/web/components/layout';
import { BASIC_COLUMS } from '../../src/web/constants/colums'

export const Salesmen = ({ salesmen }) => {

    const user = useUserData();

    return (
        <>
            <Navbar nickname={ user.nickname }/>
            <CustomGrid collection="salesmen" columns={BASIC_COLUMS} data={salesmen} />
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