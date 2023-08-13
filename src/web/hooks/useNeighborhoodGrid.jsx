import { useContext, useEffect } from "react"
import { NeighborhoodGridContext } from "../../context/NeighborhoodGridContext"
import useMappedLots from "./useMappedLots"
import { useGridTitle } from "./useGridTitle"

export default function useNeighborhoodGrid({ data }) {

    const { name, blocks } = data

    const { getGridTitle } = useGridTitle(name)
    
    const { mappedLots } = useMappedLots({ blocks })
    
    const { dataSource, updateDataSource } = useContext(NeighborhoodGridContext)

    useEffect(() => {
        updateDataSource(mappedLots)
    }, [mappedLots])

    return {
        getGridTitle,
        dataSource,
        updateDataSource
    }
}
