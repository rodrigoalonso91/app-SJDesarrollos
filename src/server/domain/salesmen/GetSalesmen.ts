import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function getSalesmen(): Promise<ReadonlyArray<any>> {
	const client = await getMongoDBClient()
	const result = await client
		.collection("SALESMEN")
		.find({})
		.toArray()

	return result.map(({ _id, ...x }) => ({
		id: _id.toString(),
		...x
	}))
}
