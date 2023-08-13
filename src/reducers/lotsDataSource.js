export const DATA_SOURCE_ACTIONS_TYPES = {
    UPDATE: "UPDATE_DATA_SOURCE"
}

const UPDATE_STATE_BY_ACTION = {

    [DATA_SOURCE_ACTIONS_TYPES.UPDATE]: (newDataSource) => {
        return newDataSource.filter(d => d.name && d.lot)
    }
}

export const lotsDataSourceReducer = (state, action) => {

    const { type, payload: newDataSource } = action
    const actionType = DATA_SOURCE_ACTIONS_TYPES[type]
    const updatedState = UPDATE_STATE_BY_ACTION[actionType]
    return updatedState ? updatedState(newDataSource) : state
}