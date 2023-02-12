import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CustomGrid } from "../../src/web/components/layout/CustomGrid"
import { BASIC_COLUMS } from "../../src/web/constants/colums"
import { getCustomers } from "../../src/server"

export const Clients = ({ customers }) => {
	return (
		<CustomGrid collection="clients" columns={BASIC_COLUMS} data={customers} />
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const customers = await getCustomers()
		return { props: { customers } }
	},
})

export default Clients
