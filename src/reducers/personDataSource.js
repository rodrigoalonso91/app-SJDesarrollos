const UPDATE_STATE_BY_ACTION = {
    ADD: (state, newItem) => {
        return {
            ...state,
            personDataSource: [...new Set([...state.personDataSource, newItem ])]
        }
    },
    ADD_MASSIVE: (state, itemList) => {
        return {
            ...state,
            personDataSource: [...new Set([...state.personDataSource, ...itemList])]
        }
    },
    DELETE: (state, index) => {
        const newState = [...state.personDataSource]
        newState.splice(index, 1)
        return { 
            ...state,
            personDataSource: newState
        }
    },
    UPDATE: (state, newData) => {
        const dataSource = state.personDataSource.filter(customer => customer.id !== newData.id)
        return {
            ...state,
            personDataSource: [...dataSource, newData]
        }
    },
    ENABLE_LOADING: (state, _payload) => {
        return { ...state, isLoading: true }
    },
    DISABLE_LOADING: (state, _payload) => {
        return { ...state, isLoading: false }
    }
}

export const customerDataSourceReducer = (state, action) => {
    const { type: actionType, payload } = action
    const updatedState = UPDATE_STATE_BY_ACTION[actionType]
    return updatedState ? updatedState(state, payload) : state
}