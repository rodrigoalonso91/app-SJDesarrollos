
const getNeighborhoodNames = async (): Promise<Array<{name: string}>> => {
    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`api/barrios`, data)
    return response.json()
}

export default getNeighborhoodNames