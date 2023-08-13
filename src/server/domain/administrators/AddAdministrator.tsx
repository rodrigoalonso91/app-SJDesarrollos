import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { LotAdministrator } from "@web/domain/types/types"

export async function addAdministrators(administrator: LotAdministrator) {
	
	const client = await getMongoDBClient()
	const result = await client.collection("ADMINISTRATORS").insertOne(administrator)
	return result.insertedId
}