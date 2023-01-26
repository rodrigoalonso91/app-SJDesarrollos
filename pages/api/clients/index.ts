import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { addCustomer } from "../../../src";
import { deleteCustomer } from "../../../src/DeleteCustomer";
import { getCustomers } from "../../../src/GetCustomers";
import { updateCustomer } from "../../../src/UpdateCustomer";

export default withApiAuthRequired(
    async (req: NextApiRequest, res: NextApiResponse) => {

        const session = await getSession(req, res)
        if (!session) return res.status(401).end()

        if (!req.query.path) {
			
			switch (req.method) {
				case "GET":
					const customers = await getCustomers()
					return res.status(200).json(customers)
				case "POST":
					await addCustomer(JSON.parse(req.body))
					return res.status(201).end()
				case "PUT":
					const { id , values } = req.body
					await updateCustomer(values, id)
					return res.status(201).end()
				case "DELETE":
					await deleteCustomer(req.body.id)
					return res.status(201).end()
				default:
					return res.status(405).end()
			}
		}
    }
)