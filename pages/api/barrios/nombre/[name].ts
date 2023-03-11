import type { NextApiRequest, NextApiResponse } from "next"
import getUser from "@server/infrastructure/GetUser"
import { getNeighborhoodByName } from "@server/domain/neighborhood/GetNeighborhoodByName"

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

	const user = await getUser({ req, res })

	if (!user.isLoggedIn) return res.status(401).end()

	const name = req.query.name!
	if (Array.isArray(name)) return res.status(500).end()

	if (!req.query.path) {

		switch (req.method) {
			case "GET": {
				if (!user.isAdmin) return res.status(403).end()
				const neighborhood = await getNeighborhoodByName({ name })
				return res.status(200).json(neighborhood)
			}
			default:
				res.status(405).end()
		}
    }
}