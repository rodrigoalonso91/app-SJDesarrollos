import { API_PATH_COLLECTIONS } from "@web/constants/collections";

export default async function updateNeighborhoodInDb(neighborhood: any) {
    const id = neighborhood._id || neighborhood.id
    delete neighborhood._id
    delete neighborhood.id

    const data = {
        method: "PUT",
        body: JSON.stringify({ ...neighborhood }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`/api/${API_PATH_COLLECTIONS['neighborhoods']}/${id}`, data)
}
