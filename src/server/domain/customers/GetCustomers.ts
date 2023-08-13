import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { Customer } from "@web/domain/types/types"

export async function getCustomers(): Promise<ReadonlyArray<Customer>> {

	const client = await getMongoDBClient()
	const result = await client.collection("CLIENTS").find({}).toArray()

	return result.map(({ _id, ...customer }) => ({
        id: _id.toString(),
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        company: customer.company
    }));
}