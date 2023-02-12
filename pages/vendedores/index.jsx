import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSalesmen } from '../../src/server/salesmen/GetSalesmen'
import { CustomGrid } from '../../src/web/components/layout';
import { BASIC_COLUMS } from '../../src/web/constants/colums'

export const Salesmen = ({ salesmen }) => {

    return (
        <>
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