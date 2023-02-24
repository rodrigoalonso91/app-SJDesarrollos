import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getSalesmen } from "../../src/server/domain/salesmen/GetSalesmen"
import { CustomGrid } from "../../src/web/components/layout"
import { BASIC_COLUMNS } from "../../src/web/constants/columns"

export const Salesmen = ({ salesmen }) => {
	return (
		<CustomGrid collection="salesmen" columns={BASIC_COLUMNS} data={salesmen} />
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const salesmen = await getSalesmen()
		return { props: { salesmen } }
	}
})

export default Salesmen