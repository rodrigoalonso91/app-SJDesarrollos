import getMongoDBClient from "./GetMongoDBClient"

export async function getNeighborhoods(): Promise<ReadonlyArray<any>> {
	const client = await getMongoDBClient()
	const result = await client
		.collection("NEIGHBORHOODS")
		.find(
			//{ $or: [{ created_by: username }, { visibility: { $ne: "private" } }] },
			{},
			{
				projection: { name: 1, lots: 1 }
			}
		)
		.toArray()

	return result.map(({ _id, ...x }) => ({
		id: _id.toString(),
		...x
	}))
}
