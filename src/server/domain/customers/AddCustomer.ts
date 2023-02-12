import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

export async function addCustomer(customer: any) {
	const client = await getMongoDBClient()
	const result = await client.collection("CLIENTS").insertOne(customer)
	return result.insertedId
}
