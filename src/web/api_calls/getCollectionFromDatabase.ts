import { DbCollection } from "@web/domain/types/types";
import { API_PATH_COLLECTIONS } from "../constants/collections";

const getCollectionFromDatabase = async (collection: DbCollection) => {
    return await fetch(`/api/${API_PATH_COLLECTIONS[collection]}`)
}

export default getCollectionFromDatabase