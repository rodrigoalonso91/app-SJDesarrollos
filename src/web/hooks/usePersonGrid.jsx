import { useContext } from "react"
import { PersonGridContext } from "../../context/PersonGridContext"

export default function usePersonGrid() {

    const {
        personDataSource,
        addPersonToDataSource,
        addManyPeopleToDataSource,
        updatePersonInDataSource,
        removeFromDataSource,
        tableLoading
    } = useContext(PersonGridContext)

    return {
        personDataSource,
        addPersonToDataSource,
        addManyPeopleToDataSource,
        updatePersonInDataSource,
        removeFromDataSource,
        tableLoading
    }
}