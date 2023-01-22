const updateRowOnDatabase = async (collection, values) => {

    const data = {
        method: "PUT",
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch(`api/${collection}`, data)
}

export default updateRowOnDatabase;