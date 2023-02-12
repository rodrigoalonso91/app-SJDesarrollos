import { ObjectId } from "mongodb"
import getMongoDBClient from "../../infrastructure/GetMongoDBClient"

export async function updateCustomer(customer: any, id: string) {
	const client = await getMongoDBClient()
	const result = await client
		.collection("CLIENTS")
		.updateOne({ _id: new ObjectId(id) }, { $set: { ...customer } })
	return result.modifiedCount
}
