import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import React from "react"

const MasterContext = React.createContext<MasterContextProps>({
	setSelected: () => {},
	selected: null,
	neighborhood: {} as Neighborhood,
	changeBlockName: () => {},
	changeLotName: () => {},
	changeLotPrice: () => {},
	changeLotStatus: () => {},
	changeLotSalesman: () => {},
	changeLotCustomer: () => {}
})

type MasterContextProps = {
	setSelected: (_: SelectedLot) => void
	selected: SelectedLot | null
	neighborhood: Neighborhood
	changeBlockName: (_: { name: string; block: number }) => void
	changeLotName: (_: { name: string; block: number; lot: number }) => void
	changeLotPrice: (_: { price: string; block: number; lot: number }) => void
	changeLotStatus: (_: { status: string; block: number; lot: number }) => void
	changeLotSalesman: (_: { salesman: string; block: number; lot: number }) => void
	changeLotCustomer: (_: { customer: string; block: number; lot: number }) => void
}

export default MasterContext

export type SelectedLot = { block: number; lot: number }
