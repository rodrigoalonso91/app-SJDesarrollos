import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getNeighborhoodsWithAdministrator } from "@server/domain/neighborhood/GetNeighborhoodsWithAdministrator";
import getUser from "@server/infrastructure/GetUser";

export default withApiAuthRequired(
    async (req, res) => {
        
        const session = getSession(req, res)

        if (!session) return res.status(401).end()

        const user = await getUser({res, req})
		if (user.roles.length === 0) return res.status(403).end()

        const id = req.query.id as string

        if (req.method === 'GET') {
            const neighborhoodList = await getNeighborhoodsWithAdministrator({ id })
            return res.status(200).json(neighborhoodList)
        }
        else {
            return res.status(405).end()
        }
    }
)