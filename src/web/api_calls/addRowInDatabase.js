const addRowInDatabase = async (collection, row) => {

    await fetch(`api/${collection}`, {
        method: "POST", body: JSON.stringify(row)
    });
};

export default addRowInDatabase;