import getMongoDBClient from "../mongo/GetMongoDBClient"

export async function addSalesman(salesman: any) {
	const client = await getMongoDBClient()
	const result = await client.collection("SALESMEN").insertOne(salesman)
	return result.insertedId
}