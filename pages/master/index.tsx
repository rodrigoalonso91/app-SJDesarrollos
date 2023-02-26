import dynamic from "next/dynamic"

const NeighborhoodCanvas = dynamic(
	() => import("@web/components/master/KonvaMaster"),
	{ ssr: false }
)

export default function NeighborhoodsScreen() {
	return <NeighborhoodCanvas />
}
