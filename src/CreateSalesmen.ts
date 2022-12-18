import getMongoDBClient from "./GetMongoDBClient"

export async function createSalesmen(salesmen: any) {
	const client = await getMongoDBClient()
	const result = await client.collection("SALESMEN").insertOne(salesmen)
	return result.insertedId
}