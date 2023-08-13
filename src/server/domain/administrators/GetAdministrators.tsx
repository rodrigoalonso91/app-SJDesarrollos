import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { LotAdministrator } from "@web/domain/types/types"

export async function getAdministrators(): Promise<ReadonlyArray<LotAdministrator>> {

	const client = await getMongoDBClient()
	const result = await client.collection("ADMINISTRATORS").find({}).toArray()

	return result.map(({ _id, ...administrator }) => ({
        id: _id.toString(),
        firstname: administrator?.firstname,
        lastname: administrator?.lastname,
        email: administrator?.email,
        phone: administrator?.phone,
        color: administrator?.color
    }));
}