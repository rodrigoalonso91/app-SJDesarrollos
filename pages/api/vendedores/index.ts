import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import type { NextApiRequest, NextApiResponse } from "next"
import {
	addSalesman,
	deleteSalesman,
	getSalesmen,
	updateSalesman
} from "../../../src/server"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession(req, res)
		if (!session) return res.status(401).end()

		const username = session.user.email

		if (!req.query.path) {
			switch (req.method) {
				case "GET":
					const salesmen = await getSalesmen()
					return res.status(200).json(salesmen)
				case "POST":
					await addSalesman(JSON.parse(req.body))
					return res.status(201).end()
				case "PUT":
					const { id, values } = req.body
					await updateSalesman(values, id)
					return res.status(201).end()
				case "DELETE":
					await deleteSalesman(req.body.id)
					return res.status(201).end()
				default:
					return res.status(405).end()
			}
		}
	}
)
