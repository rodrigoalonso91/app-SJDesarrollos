import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { BASIC_COLUMNS } from "../../src/web/constants/columns"
import { AddBasicPersonForm } from "../../src/web/components"
import getUser from '../../src/server/infrastructure/GetUser'
import getCollectionFromDatabase from "@web/api_calls/getCollectionFromDatabase"
import { useEffect, useState } from "react"
import { PersonGridDataProvider } from "../../src/context/PersonGridContext"
import PersonTable from "../../src/web/components/layout/PersonTable"

export default function Salesmen () {

	const [salesmen, setSalesmen] = useState([])
	useEffect(() => {
        getCollectionFromDatabase("salesmen")
            .then(res => res.json())
            .then(data => setSalesmen(data))
    }, [])

	const collection = 'salesmen' 

	return (
		<PersonGridDataProvider>
			<PersonTable collection={collection} columns={BASIC_COLUMNS} data={salesmen}>
				<AddBasicPersonForm collection={collection} />
			</PersonTable>
		</PersonGridDataProvider>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({ res, req }) => {

		const [ user ] = await Promise.all([
			getUser({ res, req }),
			// getSalesmen()
		])
		if (!user.isAdmin) return { notFound: true }
		
		return { props: {  } }
		
	}
})