import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { ObjectId } from "mongodb"

export async function updateCustomer(customer: any, id: string) {
	const client = await getMongoDBClient()
	const result = await client
		.collection("CLIENTS")
		.updateOne({ _id: new ObjectId(id) }, { $set: { ...customer } })
	return result.modifiedCount
}
