import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"

// NOTE: No se usa, solo esta para referencia de codigo.
export const getCustomerByName = async (name: string) => {
	const client = await getMongoDBClient()
	const result = await client
		.collection("CLIENTS")
		.find(
			{ firstname: name }, //here go the filters
			{
				projection: {
					firstname: 1,
					lastname: 1,
					phone: 1,
					email: 1
				}
			}
		)
		.toArray()

	return result.map(({ _id, ...customer }) => ({
		id: _id.toString(),
		firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        company: customer.company
	}))[0]
}
