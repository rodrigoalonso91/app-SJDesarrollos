import getMongoDBClient from "@server/infrastructure/GetMongoDBClient"
import { Block, Lot } from "@web/domain/TransformXmlToNeighborhoods";

export async function getNeighborhoodsWithAdministrator({ id }: { id: string }): Promise<any> {
	const client = await getMongoDBClient()
    const result = await client.collection("NEIGHBORHOODS").find().toArray()

	if (!result) return null

    const neighborhoodIds = result.flatMap((neighborhood) =>
        neighborhood.blocks.flatMap((block: Block) =>
            block.lots
            .filter((lot: Lot) => lot.administrator && lot.administrator.id === id)
            .map(() => neighborhood.id)
    ))

    return result.filter((neighborhood) => neighborhoodIds.includes(neighborhood._id.toString()))
}