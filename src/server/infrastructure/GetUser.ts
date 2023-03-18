import {getSession} from "@auth0/nextjs-auth0"
import { UserRole } from "@web/constants/UserRole";
import {NextApiRequest, NextApiResponse} from "next"

export default async function getUser({req, res}: AccessParams): Promise<AccessResult> {
	const session = await getSession(req, res)

	if (!session) return LOGGED_OUT_DATA

	const roles = session.user[ROLES_PROPERTY_NAME]
	const isAdmin = roles.includes(UserRole.Admin)
	const isAuditor = roles.includes(UserRole.Auditor)
	const isProprietor = roles.includes(UserRole.Proprietor)
	const isSalesman = roles.includes(UserRole.Salesman)

	return {isAdmin, isAuditor, isProprietor, isSalesman, isLoggedIn: true, email: session.user.email}
}

const LOGGED_OUT_DATA = {
	isLoggedIn: false,
	isAdmin: false,
	isAuditor: false,
	isProprietor: false,
	isSalesman: false,
	email: ""
}

export type AccessParams = {
	req: NextApiRequest,
	res: NextApiResponse
}

export type AccessResult = {
	isLoggedIn: boolean,
	isAdmin: boolean,
	isAuditor: boolean,
	isProprietor: boolean,
	isSalesman: boolean,
	email: string
}

const ROLES_PROPERTY_NAME = `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/roles`
