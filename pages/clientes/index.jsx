import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CustomGrid } from "../../src/web/components/layout/CustomGrid"
import { CUSTOMER_COLUMNS } from "../../src/web/constants/columns"
import { getCustomers } from "../../src/server"

export const Clients = ({ customers }) => {
	return (
		<CustomGrid collection="clients" columns={CUSTOMER_COLUMNS} data={customers} />
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const customers = await getCustomers()
		return { props: { customers } }
	},
})

export default Clients
