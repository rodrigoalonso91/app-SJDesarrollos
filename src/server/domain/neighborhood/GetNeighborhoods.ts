import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function getNeighborhoods(): Promise<ReadonlyArray<any>> {
	const client = await getMongoDBClient()
	const result = await client
		.collection("NEIGHBORHOODS")
		.find(
			{}, //here go the filters

		)
		.toArray()


	return result.map(({ _id, ...x }) => ({
		id: _id.toString(),
		...x
	}))
}
