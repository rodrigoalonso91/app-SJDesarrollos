import { API_PATH_COLLECTIONS } from "../constants/collections";

const deleteRowOnDatabase = async (collection, id) => {

    const data = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, data)
}

export default deleteRowOnDatabase;