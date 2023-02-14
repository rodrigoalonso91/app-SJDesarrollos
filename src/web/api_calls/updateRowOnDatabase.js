import { API_PATH_COLLECTIONS } from "../constants/collections";

const updateRowOnDatabase = async (collection, updatedRow) => {

    const data = {
        method: "PUT",
        body: JSON.stringify({ ...updatedRow }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, data);
}

export default updateRowOnDatabase;