import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { HomeCard, HomeCardContainer } from "@web/components"
import { getNeighborhoods } from "../src/server"
import useUserData from "../src/web/hooks/UseUserData"
import { modules } from '../src/web/constants/appModules'
import { Backdrop, CircularProgress } from "@mui/material"
import { useBackDrop } from "@web/hooks"

export default function Home({ neighborhoods }: { neighborhoods: ReadonlyArray<any> }) {

	const user = useUserData()
	const { isOpen, openBackDrop } = useBackDrop()

	return (
		<>
			<HomeCardContainer>
				{
					modules.map( module => (
						<HomeCard key={module.title} module={module} openBackDrop={openBackDrop} >
							{ module.icon() }
						</HomeCard>
					))
				}
			</HomeCardContainer>
			<Backdrop style={{ zIndex: 100 }} open={isOpen}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})

// async function createNeighborhood() {
// 	await fetch(`/api/barrios`, { method: "POST" })
// }

// async function deleteNeighborhoodOfId(id: string) {
// 	await fetch(`/api/barrios/${id}`, { method: "DELETE" })
// }