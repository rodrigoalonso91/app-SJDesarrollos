import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CustomGrid } from "../../src/web/components/layout/CustomGrid"
import { CUSTOMER_COLUMNS } from "../../src/web/constants/columns"
import { getCustomers } from "../../src/server"
import { AddCustomerForm } from "../../src/web/components/AddCustomerForm"
import { useDataSource } from "../../src/web/hooks"

export const Clients = ({ customers }) => {

	const { dataSource, updateDataSource } = useDataSource({ data: customers })
	const collection = 'clients' 

	return (
		<CustomGrid collection={collection} columns={CUSTOMER_COLUMNS} data={dataSource}>
			<AddCustomerForm 
				collection={collection}
				data={customers}
				updateDataSource={updateDataSource}
			/>
		</CustomGrid>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const customers = await getCustomers()
		return { props: { customers } }
	},
})

export default Clients
