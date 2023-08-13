import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CUSTOMER_COLUMNS } from "../../src/web/constants/columns"
import { getCustomers } from "../../src/server"
import { AddCustomerForm } from "../../src/web/components/AddCustomerForm"
import getUser from "../../src/server/infrastructure/GetUser"
import { PersonGridDataProvider } from "../../src/context/PersonGridContext"
import PersonTable from "@web/components/layout/PersonTable"

export default function Clients ({ customers }) {

	const collection = 'clients' 

	return (
		<PersonGridDataProvider>
			<PersonTable collection={collection} columns={CUSTOMER_COLUMNS} data={customers}>
				<AddCustomerForm collection={collection} />
			</PersonTable>
		</PersonGridDataProvider>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({ res, req }) => {

		const [ user, customers ] = await Promise.all([
			getUser({ res, req }),
			getCustomers()
		])
		if (!user.isAdmin) return { notFound: true }
		
		return { props: { customers } }
	},
})