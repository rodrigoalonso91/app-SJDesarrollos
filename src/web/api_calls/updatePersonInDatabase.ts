import { DbCollection, PersonDbRow } from "@web/domain/types/types";
import { API_PATH_COLLECTIONS } from "../constants/collections";
import { normalizeData } from "@web/domain/utils/NormalizeData";

const updatePersonInDatabase = async (collection: DbCollection, row: PersonDbRow) => {

    const updatedRow = normalizeData(row)
    const data = {
        method: "PUT",
        body: JSON.stringify({ ...updatedRow }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, data);
}

export default updatePersonInDatabase;