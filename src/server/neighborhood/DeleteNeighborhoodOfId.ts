import getMongoDBClient from "../mongo/GetMongoDBClient"
import { ObjectId } from "mongodb"

export default async function deleteNeighborhoodOfId(id: string) {
	const client = await getMongoDBClient()
	await client.collection("NEIGHBORHOODS").deleteOne({ _id: new ObjectId(id) })
}
