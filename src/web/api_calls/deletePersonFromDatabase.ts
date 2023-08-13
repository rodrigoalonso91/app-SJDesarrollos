import { DbCollection } from "@web/domain/types/types";
import { API_PATH_COLLECTIONS } from "../constants/collections";

const deletePersonFromDatabase = async (collection: DbCollection, id: string) => {

    const data = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, data)
}

export default deletePersonFromDatabase;