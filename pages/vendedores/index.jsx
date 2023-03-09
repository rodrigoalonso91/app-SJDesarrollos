import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getSalesmen } from "../../src/server/domain/salesmen/GetSalesmen"
import { CustomGrid } from "../../src/web/components/layout"
import { BASIC_COLUMNS } from "../../src/web/constants/columns"
import { AddSalesmanForm } from "../../src/web/components" 
import { useDataSource } from "../../src/web/hooks"
import getUser from '../../src/server/infrastructure/GetUser'

export const Salesmen = ({ salesmen }) => {

	const { dataSource, updateDataSource } = useDataSource({ data: salesmen })
	const collection = 'salesmen' 

	return (
		<CustomGrid collection={collection} columns={BASIC_COLUMNS} data={dataSource}>
			<AddSalesmanForm
				collection={collection}
				data={salesmen}
				setData={updateDataSource}
			/>
		</CustomGrid>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({ res, req }) => {

		const user = await getUser({ res, req })
		if (!user.isAdmin) return { notFound: true }
		
		const salesmen = await getSalesmen()
		return { props: { salesmen } }
	}
})

export default Salesmen