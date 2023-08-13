import { useReducer } from "react"
import { customerDataSourceReducer } from "../../reducers/personDataSource"

const initialState = {
    isLoading: false,
    personDataSource: []
}
export default function useCustomerDataSourceReducer() {

    const [ state, dispatch ] = useReducer(customerDataSourceReducer, initialState)
    const addPersonToDataSource = (newCustomer) => {
        dispatch({
            type: "ADD",
            payload: newCustomer
        })
    }

    const addManyPeopleToDataSource = (customerList) => {
        if (customerList.length === 0) return
        dispatch({
            type: "ADD_MASSIVE",
            payload: customerList
        })
    }

    const removeFromDataSource = (index) => {
        dispatch({ type: "DELETE", payload: index })
    }

    const updatePersonInDataSource = (updatedItem) => {
        dispatch({ type: "UPDATE", payload: updatedItem })
    }

    const tableLoading = {
        isLoading: state.isLoading,
        enableLoading: () => {
            dispatch({ type: "ENABLE_LOADING" })
        },
        disableLoading: () => {
            dispatch({ type: "DISABLE_LOADING" })
        }
    }

    return {
        personDataSource: state.personDataSource,
        addPersonToDataSource,
        addManyPeopleToDataSource,
        removeFromDataSource,
        updatePersonInDataSource,
        tableLoading
    }
}