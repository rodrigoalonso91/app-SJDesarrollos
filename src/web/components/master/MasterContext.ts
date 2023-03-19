import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate";
import React from "react"

const MasterContext = React.createContext<MasterContextProps>({
	setSelected: () => {},
	selected: null,
	setHighlighted: () => {},
	highlighted: [],
	neighborhood: {} as Neighborhood,
	changeBlockName: () => {},
	changeLotName: () => {},
	changeLotPrice: () => {},
	changeLotStatus: () => {},
	changeLotSalesman: () => {},
	changeLotCustomer: () => {},

	salesmen: [],
	customers: [],
})

type MasterContextProps = {
	setSelected: (_: SelectedLot) => void
	selected: SelectedLot | null
	setHighlighted: (_: Array<Terrain>) => void,
	highlighted: Array<Terrain>,
	neighborhood: Neighborhood
	changeBlockName: (_: { name: string; block: number }) => void
	changeLotName: (_: { name: string; block: number; lot: number }) => void
	changeLotPrice: (_: { price: string; block: number; lot: number }) => void
	changeLotStatus: (_: { status: string; block: number; lot: number }) => void
	changeLotSalesman: (_: { salesman: string; block: number; lot: number }) => void
	changeLotCustomer: (_: { customer: string; block: number; lot: number }) => void

	salesmen: Array<Person>
	customers: Array<Person>
}

export default MasterContext

export type SelectedLot = { block: number; lot: number }

export type Terrain = {
	name: string | null
	coordinates: Array<Coordinate>
}

export type Person = {
	id: string
	fullname: string
}
