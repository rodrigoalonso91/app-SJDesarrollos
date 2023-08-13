import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { addSalesman } from "@server/domain/salesmen/AddSalesman"
import { deleteSalesman } from "@server/domain/salesmen/DeleteSalesman"
import { getSalesmen } from "@server/domain/salesmen/GetSalesmen"
import { updateSalesman } from "@server/domain/salesmen/UpdateSalesman"
import type { NextApiRequest, NextApiResponse } from "next"
import getUser from "@server/infrastructure/GetUser"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getSession(req, res)
		if (!session) return res.status(401).end()

		const user = await getUser({res, req})
		if (!user.isAdmin) return res.status(403).end()

		const username = session.user.email

		if (!req.query.path) {
			if (req.method === "GET") {
				const salesmen = await getSalesmen()
				return res.status(200).json(salesmen)
			}
			else if (req.method === "POST") {
				const id = await addSalesman(JSON.parse(req.body))
				return res.status(201).json({ id });
			}
			else if (req.method === "PUT") {
				const { id, values } = req.body
				await updateSalesman(values, id)
				return res.status(201).end()
			}
			else if (req.method === "DELETE") {
				await deleteSalesman(req.body.id)
				return res.status(201).end()
			}
			else {
				return res.status(405).end();
			}
		}
	}
)
