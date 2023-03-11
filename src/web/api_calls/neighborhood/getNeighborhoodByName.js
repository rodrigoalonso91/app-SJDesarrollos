
const getNeighborhoodByName = async (name) => {
    
    if (!name) return

    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`api/barrios/nombre/${name}`, data)
    console.log("🚀 ~ file: getNeighborhoodByName.js:15 ~ getNeighborhoodByName ~ response:", response)
    // return JSON.parse(response.body)
    
}

export default getNeighborhoodByName