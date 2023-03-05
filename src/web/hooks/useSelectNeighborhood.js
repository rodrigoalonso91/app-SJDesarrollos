import { useEffect, useState } from "react"

export function useSelectNeighborhood({ neighborhoods }) {

    const [neighborhoodsFromDB, setNeighborhoodsFromDB] = useState([])
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
	const [selectedNeighborhoodData, setSelectedNeighborhoodData] = useState({name: '', blocks: []})

    useEffect(() => {
        setNeighborhoodsFromDB(neighborhoods)
    }, [neighborhoods])

    useEffect(() => {

		if (!selectedNeighborhood) return

		const data = neighborhoodsFromDB?.find( n => n.id === selectedNeighborhood )

		setSelectedNeighborhoodData(data)
	},
	[selectedNeighborhood, neighborhoodsFromDB])

    const updateSelectedNeighborhood = ({ value }) => { 
        setSelectedNeighborhood(value)
    }

    const clearSelectedNeighborhood = () => {

        const newDbData = neighborhoodsFromDB.filter( n => n.id !== selectedNeighborhood)
        
        setSelectedNeighborhood('')
        setNeighborhoodsFromDB(newDbData)
        setSelectedNeighborhoodData({name: '', blocks: []})
    }

    return {
        selectedNeighborhoodData,
        updateSelectedNeighborhood,
        selectedNeighborhood,
        clearSelectedNeighborhood,
        neighborhoodsFromDB
    }
}
