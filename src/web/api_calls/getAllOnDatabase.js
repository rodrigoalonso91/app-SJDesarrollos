import { API_PATH_COLLECTIONS } from "../constants/collections";

const getAllOnDatabase = async (collection) => {
    return await fetch(`/api/${API_PATH_COLLECTIONS[collection]}`)
}

export default getAllOnDatabase