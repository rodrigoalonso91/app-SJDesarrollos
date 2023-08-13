import { useReducer } from "react"
import { lotsDataSourceReducer } from "src/reducers/lotsDataSource"

export default function useLotsDataSourceReducer() {

    const [ state, dispatch ] = useReducer(lotsDataSourceReducer, [])

    const updateDataSource = newData => dispatch({
        type: "UPDATE",
        payload: newData
    })

    return {
        dataSource: state,
        updateDataSource
    }
}