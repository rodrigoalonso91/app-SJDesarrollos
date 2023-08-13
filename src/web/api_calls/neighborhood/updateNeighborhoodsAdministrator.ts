import { Block, Lot, Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";
import { BasicDataAdministrator } from "@web/domain/types/types";
import getNeighborhoodsByAdministratorId from "./getNeighborhoodsByAdministratorId";
import updateNeighborhoodInDb from "./updateNeighborhoodInDb";

export default async function updateNeighborhoodsAdministrator(administrator: BasicDataAdministrator) {

    const { id } = administrator
    const neighborhoodList = await getNeighborhoodsByAdministratorId({ id })

    for (const neighborhood of neighborhoodList) {
        updateNeighborhoodAdministrators(neighborhood, administrator)
        await updateNeighborhoodInDb(neighborhood)
    }
}

function updateNeighborhoodAdministrators(neighborhood: Neighborhood, administrator: BasicDataAdministrator) {
    neighborhood.blocks.forEach(block => updateNeighborhoodBlocks(block, administrator));
}

function updateNeighborhoodBlocks(block: Block, administrator: BasicDataAdministrator) {
    block.lots.forEach(lot => updateBlockLots(lot, administrator));
}

function updateBlockLots(lot: Lot, administrator: BasicDataAdministrator) {
    if (lot.administrator?.id === administrator.id) lot.administrator = administrator
}