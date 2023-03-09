import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { HomeCard, HomeCardContainer } from "@web/components"
import { getNeighborhoods } from "../src/server"
import { modules } from '../src/web/constants/appModules'
import { Backdrop, CircularProgress } from "@mui/material"
import { useBackDrop } from "@web/hooks"
import getUser from "@server/infrastructure/GetUser"

export default function Home() {

	const { isOpen, openBackDrop } = useBackDrop()

	return (
		<>
			<HomeCardContainer>
				{
					modules.map(module =>(
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

	getServerSideProps: async ({res, req} : any) => {

		const user = await getUser({ res, req })

		if (!user.isAdmin) return { redirect: { permanent: false, destination: '/barrios' } }

		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})