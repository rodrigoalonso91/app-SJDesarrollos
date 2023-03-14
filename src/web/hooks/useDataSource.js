import { useEffect, useState } from "react"

export function useDataSource ({ data }) {

    const [dataSource, setDataSource] = useState([])

    useEffect( () => {

        if (data) {
            setDataSource(data.filter( d => d.name && d.lot))
        }

    }, [data])

    const updateDataSource = (data) => {
        setDataSource(data.filter( d => d.name && d.lot))
    }

    return {
        dataSource,
        updateDataSource
    }
}
