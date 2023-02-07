import type {NextApiRequest, NextApiResponse} from "next"
import getUser from "../../../src/server/mongo/GetUser"
import deleteNeighborhoodOfId from "../../../src/server/neighborhood/DeleteNeighborhoodOfId"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUser({req, res})
	if (!user.isLoggedIn) return res.status(401).end()

	const id = req.query.id!
	if (Array.isArray(id)) return res.status(500).end()

	if (!req.query.path)
		switch (req.method) {
			case "DELETE": {
				if (!user.isAdmin) return res.status(403).end()
				await deleteNeighborhoodOfId(id)
				return res.status(204).end()
			}
			default:
				res.status(405).end()
		}
}
