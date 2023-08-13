import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getNeighborhoods } from "@server/index"
import dynamic from "next/dynamic";
import getUser from "@server/infrastructure/GetUser"


const NeighborhoodScreen = dynamic(
	() => import("../../src/web/components/neighborhood/NeighborhoodScreen"),
	{ ssr: false }
)

export const Neighborhood = ({ neighborhoods }) => {
	return <NeighborhoodScreen neighborhoods={neighborhoods} />
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async ({res, req}) => {

		const user = await getUser({ res, req })
		const neighborhoods = await getNeighborhoods()
		if (user.roles.length === 0) return { notFound: true }
		return { props: { neighborhoods } }
	}
})
