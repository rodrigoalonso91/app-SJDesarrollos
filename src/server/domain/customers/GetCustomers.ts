import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function getCustomers(): Promise<ReadonlyArray<any>> {
	const client = await getMongoDBClient()
	const result = await client
		.collection("CLIENTS")
		.find(
			{}
		)
		.toArray()

	return result.map(({ _id, ...x }) => ({
		id: _id.toString(),
		...x
	}))
}
