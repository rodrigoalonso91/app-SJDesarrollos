import { useUser } from "@auth0/nextjs-auth0"

export default function useUserData() {
	const { user } = useUser()
	const roles = (user?.[ROLES_PROPERTY_NAME] as ReadonlyArray<string>) || []

	const isAdmin = roles.includes(UserRole.Admin)
	const isAuditor = roles.includes(UserRole.Auditor)
	const isProprietor = roles.includes(UserRole.Proprietor)

	return {isAdmin, isAuditor, isProprietor, isLoggedIn: true, email: user?.email}

}

export const ROLES_PROPERTY_NAME = `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/roles`


export enum UserRole {
	Admin = "Admin",
	Auditor = "Auditor",
	Proprietor = "Proprietor"
}
