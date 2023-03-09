
const deleteNeighborhoodById = async (id) => {

    const data = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/barrios/${id}`, data)
}

export default deleteNeighborhoodById;