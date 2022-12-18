import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createSalesmen, getSalesmen } from "../../../src/"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
async (req: NextApiRequest, res: NextApiResponse) => {

		const session = await getSession(req, res)
		if (!session) return res.status(401).end()
		const username = session.user.email

		if (!req.query.path)
			switch (req.method) {
				case "GET":
					const salesmens = await getSalesmen()
					return res.status(200).json(salesmens)
				case "POST":
					const id = await createSalesmen(JSON.parse(req.body))
					return res.status(201).end()
				default:
					return res.status(405).end()
			}
	}
)
