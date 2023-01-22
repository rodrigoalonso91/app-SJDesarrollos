import {ObjectId} from "mongodb"
import getMongoDBClient from "./GetMongoDBClient"

export async function updateSalesman(salesman: any, id: string) {
	
	const client = await getMongoDBClient()
	const result = await client.collection("SALESMEN").updateOne({_id: new ObjectId(id)}, { $set: { ...salesman } })
	return result.modifiedCount
}