const updateRowOnDatabase = async (collection, updatedRow) => {

    const data = {
        method: "PUT",
        body: JSON.stringify({ ...updatedRow }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${collection}`, data);
}

export default updateRowOnDatabase;