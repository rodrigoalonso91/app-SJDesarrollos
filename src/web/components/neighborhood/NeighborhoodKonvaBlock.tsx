import NeighborhoodKonvaLot from "@web/components/neighborhood/NeighborhoodKonvaLot"
import { Block } from "@web/domain/TransformXmlToNeighborhoods"
import React from "react"

export default function NeighborhoodKonvaBlock({ block }: { block: Block }) {
	return (
		<>
			{block.lots.map((lot, i) => (
				<NeighborhoodKonvaLot
					key={`${block.name}-${lot.name}-${i}`}
					lot={lot}
				/>
			))}
		</>
	)
}
