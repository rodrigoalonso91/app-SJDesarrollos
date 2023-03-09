import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createNeighborhood } from "@server/domain/neighborhood/CreateNeighborhood"
import { getNeighborhoods } from "@server/domain/neighborhood/GetNeighborhoods"
import { updateNeighborhood } from "@server/domain/neighborhood/UpdateNeighborhood"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {

		const session = await getSession(req, res)
		if (!session) return res.status(401).end()

		const username = session.user.email

		if (!req.query.path) {
			switch (req.method) {
				case "GET":
					const neighborhoods = await getNeighborhoods()
					return res.status(200).json(neighborhoods)
				case "POST":
					const creation_time = new Date().toISOString()
					const id = await createNeighborhood(JSON.parse(req.body))
					return res.status(201).end()
				case "PUT":
					console.log(req.body)
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
