import { API_PATH_COLLECTIONS } from "@web/constants/collections";
import { DbCollection, PersonDbRow, PersonId } from "@web/domain/types/types";
import { normalizeData } from "@web/domain/utils/NormalizeData";

const addPersonToDatabase = async (collection: DbCollection, row: PersonDbRow): Promise<PersonId> => {
    
    const response = await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, {
        method: "POST", body: JSON.stringify(normalizeData(row))
    })
    return response.json()
};

export default addPersonToDatabase