import getMongoDBClient from "../mongo/GetMongoDBClient"

export const getSalesmanByName = async (name : string) => {

    const client = await getMongoDBClient()
	const result = await client
		.collection("SALESMEN")
		.find(
			{firstname : name}, //here go the filters
			{
				projection: { 
					firstname: 1,
					lastname: 1,
					phone: 1,
					email: 1
				}
			}
		).toArray()

	return result.map( ({ _id, ...x }) => ({
		id: _id.toString(),
		...x
	}))[0]
}