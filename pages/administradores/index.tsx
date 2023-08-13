import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getAdministrators } from "@server/domain/administrators/GetAdministrators"
import getUser from "@server/infrastructure/GetUser"
import { LotAdministrator } from "@web/domain/types/types"
import { PersonGridDataProvider } from "src/context/PersonGridContext"
import PersonTable from "@web/components/layout/PersonTable"
import { ADMINISTRATOR_COLUMNS } from "../../src/web/constants/columns"
import { AddAdministratorForm } from "@web/components"
import { useMemo } from "react"

type Props = {
    administrators: LotAdministrator[]
}

const Administrators: React.FC<Props> = ({ administrators }) => {

    const columns = useMemo(() => ADMINISTRATOR_COLUMNS, [])
    const collection = 'administrators'

    return (
        <PersonGridDataProvider>
            <PersonTable
                collection={collection}
                data={administrators}
                columns={columns}
            >
                <AddAdministratorForm collection={collection} />
            </PersonTable>
        </PersonGridDataProvider>
    )
}

export default Administrators

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps({ res, req }: any) {
        const [ user, administrators ] = await Promise.all([
            getUser({ res, req }),
            getAdministrators(),
        ])
        if (!user.isAdmin) return { notFound: true }
        return { props: { administrators } }
    }
})