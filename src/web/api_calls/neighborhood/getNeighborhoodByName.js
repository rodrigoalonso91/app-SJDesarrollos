
const getNeighborhoodByName = async (name) => {
    
    if (!name) return

    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`api/barrios/nombre/${name}`, data)
    const result = await response.json()
    return result
    
}

export default getNeighborhoodByName