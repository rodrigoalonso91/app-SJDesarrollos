import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import type { NextApiRequest, NextApiResponse } from "next"
import { createNeighborhood, getNeighborhoods } from "../../../src/server"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession(req, res)
		if (!session) return res.status(401).end()
		const username = session.user.email

		if (!req.query.path)
			switch (req.method) {
				case "GET":
					const neighborhoods = await getNeighborhoods()

					return res.status(200).json(neighborhoods)
				case "POST":
					const creation_time = new Date().toISOString()
					const id = await createNeighborhood({ name: creation_time })
					return res.status(201).end()
				default:
					return res.status(405).end()
			}
	}
)
