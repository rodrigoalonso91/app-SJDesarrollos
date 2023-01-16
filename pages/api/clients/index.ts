import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { addCustomer } from "../../../src";

export default withApiAuthRequired(
    async (req: NextApiRequest, res: NextApiResponse) => {

        const session = await getSession(req, res)
        if (!session) return res.status(401).end()

        if (!req.query.path) {
			
			switch (req.method) {
				case "GET":
					console.log("GET")
				case "POST":
					const customer = JSON.parse(req.body)
					await addCustomer(customer)
					return res.status(201).end()
				case "PUT":
					console.log("PUT")
				default:
					return res.status(405).end()
			}
		}
    }
)