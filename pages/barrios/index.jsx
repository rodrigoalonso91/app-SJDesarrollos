import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getNeighborhoods } from "@server/index"
import dynamic from "next/dynamic";


const NeighbordhoodScreen = dynamic(
	() => import("../../src/web/components/neighborhood/NeighborhoodScreen"),
	{ ssr: false }
)

export const Neighborhood = ({ neighborhoods }) => {
	return <NeighbordhoodScreen neighborhoods={neighborhoods} />
}

export default Neighborhood

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return { props: { neighborhoods } }
	}
})
