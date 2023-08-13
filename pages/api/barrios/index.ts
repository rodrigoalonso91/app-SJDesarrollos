import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createNeighborhood } from "@server/domain/neighborhood/CreateNeighborhood"
import { getNeighborhoods } from "@server/domain/neighborhood/GetNeighborhoods"
import { updateNeighborhood } from "@server/domain/neighborhood/UpdateNeighborhood"
import type { NextApiRequest, NextApiResponse } from "next"
import getUser from "@server/infrastructure/GetUser"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {

		const session = await getSession(req, res)
		if (!session) return res.status(401).end()

		const user = await getUser({res, req})
		if (user.roles.length === 0) return res.status(403).end()

		if (!req.query.path) {
			switch (req.method) {
				case "GET":
					const neighborhoods = await getNeighborhoods()
					return res.status(200).json(neighborhoods)
				case "POST":
					const id = await createNeighborhood(JSON.parse(req.body))
					return res.status(201).json(id)
				case "PUT":
					const response = await updateNeighborhood(req.body.id, req.body)
					if (response === 1) {
						return res.status(200).end()
					}
					else {
						return res.status(304).end()
					}
				default:
					return res.status(405).end()
			}
		}
	}
)
