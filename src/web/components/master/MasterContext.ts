import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import React from "react"

const MasterContext = React.createContext<MasterContextProps>({
	setSelected: () => {},
	selected: null,
	neighborhood: null,
	changeBlockName: () => {},
	changeLotName: () => {}
})

type MasterContextProps = {
	setSelected: (_: SelectedLot) => void
	selected: SelectedLot | null
	neighborhood: Neighborhood | null
	changeBlockName: (_: { name: string; block: number }) => void
	changeLotName: (_: { name: string; block: number; lot: number }) => void
}

export default MasterContext

export type SelectedLot = { block: number; lot: number | null }