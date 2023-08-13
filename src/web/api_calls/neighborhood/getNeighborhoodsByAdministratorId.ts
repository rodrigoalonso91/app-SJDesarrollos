import { Neighborhood } from "@web/domain/types/types"

const getNeighborhoodsByAdministratorId = async ({ id }: { id: string}): Promise<Neighborhood[]> => {

    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`api/barrios/administradores/${id}`, data)
    return await response.json()
}

export default getNeighborhoodsByAdministratorId