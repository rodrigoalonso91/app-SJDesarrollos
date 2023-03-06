import KonvaLot from "@web/components/master/KonvaLot"
import { Block } from "@web/domain/TransformXmlToNeighborhoods"
import React from "react"

export default function KonvaBlock({ lots, block }: Block & { block: number }) {
	return (
		<>
			{lots.map(({ coordinates, name }, i) => (
				<KonvaLot
					key={i}
					coordinates={coordinates}
					name={name ?? ''}
					block={block}
					lot={i}
				/>
			))}
		</>
	)
}
