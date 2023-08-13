import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { Customer } from "@web/domain/types/types"

export async function addCustomer(customer: Customer) {
	const client = await getMongoDBClient()
	const result = await client.collection("CLIENTS").insertOne(customer)
	return result.insertedId
}
