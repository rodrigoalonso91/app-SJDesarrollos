import { API_PATH_COLLECTIONS } from "../constants/collections";

const getAllOnDatabase = async (collection) => {

    const response = await fetch(`api/${API_PATH_COLLECTIONS[collection]}`)
    return response
}

export default getAllOnDatabase