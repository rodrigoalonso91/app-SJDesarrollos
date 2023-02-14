import dynamic from "next/dynamic"

const NeighborhoodCanvas = dynamic(
	() => import("@web/components/NeighborhoodCanvas"),
	{
		ssr: false
	}
)

export default function NeighborhoodsScreen() {
	return <NeighborhoodCanvas />
}
