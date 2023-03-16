import { useEffect, useState } from "react"

export function usePersonDataSource ({ data }) {

    const [dataSource, setDataSource] = useState([])

    useEffect( () => {

        if (data) {
            setDataSource(data)
        }

    }, [data])

    const updateDataSource = (data) => {
        setDataSource(data)
    }

    return {
        dataSource,
        updateDataSource
    }
}
