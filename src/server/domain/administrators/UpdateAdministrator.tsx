import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { LotAdministrator } from "@web/domain/types/types"
import { ObjectId } from "mongodb"

export async function updateAdministrators(administrator: LotAdministrator, id: string) {
	const client = await getMongoDBClient()
	const result = await client.collection("ADMINISTRATORS").updateOne({ _id: new ObjectId(id) }, { $set: { ...administrator } })
	return result.modifiedCount
}
