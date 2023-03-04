import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { ObjectId } from "mongodb"

export async function updateNeighborhood (id : string, neighborhood: any): Promise<number> {
    
	const client = await getMongoDBClient()
	const result = await client.collection("NEIGHBORHOODS")
                               .updateOne({ _id: new ObjectId(id) }, { $set: { ...neighborhood } })
    return result.modifiedCount
}