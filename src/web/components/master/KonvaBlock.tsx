import KonvaLot from "@web/components/master/KonvaLot"
import MasterContext from "@web/components/master/MasterContext";
import { Block } from "@web/domain/TransformXmlToNeighborhoods"
import React, { useContext } from "react";

export default function KonvaBlock({ lots, block, highlight }: Block & { block: number, highlight: boolean }) {
  const {highlighted} = useContext(MasterContext)
	return (
		<>
			{lots.map((lot, i) => (
				<KonvaLot
					key={i}
					coordinates={lot.coordinates}
					name={lot.name ?? ''}
					block={block}
					lot={i}
					highlight={highlight || highlighted.includes(lot)}
				/>
			))}
		</>
	)
}
