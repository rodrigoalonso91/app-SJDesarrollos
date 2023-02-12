import dynamic from "next/dynamic"

const Neighborhoods = dynamic(() => import("@web/components/Neighborhood"), {
	ssr: false
})

export default function NeighborhoodsScreen() {
	return <Neighborhoods />
}
