import { ObjectId } from "mongodb"
import getMongoDBClient from "../../infrastructure/GetMongoDBClient"

export async function deleteSalesman(id: string) {
	const client = await getMongoDBClient()
	const result = await client
		.collection("SALESMEN")
		.deleteOne({ _id: new ObjectId(id) })
	return result.deletedCount
}
