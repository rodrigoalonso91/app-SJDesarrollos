import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { HomeCard } from "@web/components"
import { modules } from '../src/web/constants/appModules'
import { Backdrop, CircularProgress } from "@mui/material"
import { useBackDrop } from "@web/hooks"
import getUser from "@server/infrastructure/GetUser"
import styles from './home.module.css'

export default function Home() {

	const { isOpen, openBackDrop } = useBackDrop()

	return (
		<>
			<section className={styles.cardContainer}>
				{
					modules.map(module =>(
						<HomeCard key={module.title} module={module} openBackDrop={openBackDrop} >
							{ module.icon() }
						</HomeCard>
					))
				}
			</section>
			<Backdrop style={{ zIndex: 100 }} open={isOpen}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({ res, req } : any) => {

		const user = await getUser({ res, req })

		if (user.roles.length === 0) return { redirect: { permanent: false, destination: '/noautorizado' } }
		if (!user.isAdmin) return { redirect: { permanent: false, destination: '/barrios' } }

		return { props: { } }
	}
})