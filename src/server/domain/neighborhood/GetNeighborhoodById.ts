import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { ObjectId } from "mongodb";

export async function getNeighborhoodById(id: string): Promise<any> {
	const client = await getMongoDBClient()
	const result = await client.collection("NEIGHBORHOODS").findOne({ _id: new ObjectId(id) })
	if (!result) return null
	const {_id, ...neighborhood} = result
	return {...neighborhood, id: _id.toString()}
}
