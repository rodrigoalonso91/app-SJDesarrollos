import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function createNeighborhood(neighborhood: any) {
	const client = await getMongoDBClient()
	const result = await client
		.collection("NEIGHBORHOODS")
		.insertOne(neighborhood)
	return result.insertedId
}
