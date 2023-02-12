import dynamic from "next/dynamic";

const Neighborhoods = dynamic(() => import("../../src/web/components/Neighborhood"), {ssr: false});

export default function NeighborhoodsScreen() {
  return <Neighborhoods/>
}