import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { addAdministrators } from "@server/domain/administrators/AddAdministrator"
import { deleteAdministrators } from "@server/domain/administrators/DeleteAdministrator"
import { getAdministrators } from "@server/domain/administrators/GetAdministrators"
import { updateAdministrators } from "@server/domain/administrators/UpdateAdministrator"
import getUser from "@server/infrastructure/GetUser"
import { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
    async (req: NextApiRequest, res: NextApiResponse) => {

    const session = getSession(req, res)

    if (!session) return res.status(401).end()
    
    const user = await getUser({ res, req })
    if (!user.isAdmin) return res.status(403).end()

    if (!req.query.path) {
        if (req.method === "GET") {
            const administrators = await getAdministrators();
            return res.status(200).json(administrators);
        }
        else if (req.method === "POST") {
            const id = await addAdministrators(JSON.parse(req.body));
            return res.status(201).json({ id });
        }
        else if (req.method === "PUT") {
            const { id, values } = req.body;
            await updateAdministrators(values, id);
            return res.status(201).end();
        }
        else if (req.method === "DELETE") {
            await deleteAdministrators(req.body.id);
            return res.status(201).end();
        }
        else {
            return res.status(405).end();
        }
    }
})