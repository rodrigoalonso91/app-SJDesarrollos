const deleteRowOnDatabase = async (collection, id) => {

    const data = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${collection}`, data)
}

export default deleteRowOnDatabase;