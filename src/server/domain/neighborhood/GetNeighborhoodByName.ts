import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function getNeighborhoodByName({ name }: { name: string }): Promise<any> {
	const client = await getMongoDBClient()
	const result = await client.collection("NEIGHBORHOODS").findOne({ name })

    return result

	// return result.map(({ _id, ...x }) => ({
	// 	id: _id.toString(),
	// 	...x
	// }))
}
