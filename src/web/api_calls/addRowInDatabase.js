import { API_PATH_COLLECTIONS } from "../constants/collections";

const addRowInDatabase = async (collection, row) => {

    await fetch(`api/${API_PATH_COLLECTIONS[collection]}`, {
        method: "POST", body: JSON.stringify(row)
    });
};

export default addRowInDatabase;