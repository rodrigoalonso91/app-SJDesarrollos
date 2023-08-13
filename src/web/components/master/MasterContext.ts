import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import { Coordinate } from "@web/domain/types/Coordinate";
import { NeighborhoodLotAdministrator, NeighborhoodLotCoCustomer, NeighborhoodLotCustomer, NeighborhoodLotSalesman, NewBlockData, NewLotData, NewLotPriceData, NewLotStatusData } from "@web/domain/types/types";
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
	changeLotCoCustomer: () => {},
	changeLotAdministrator: () => {},
	administrators: [],
	salesmen: [],
	customers: [],
})

type MasterContextProps = {
	setSelected: (_: SelectedLot) => void
	selected: SelectedLot | null
	setHighlighted: (_: Array<Terrain>) => void,
	highlighted: Array<Terrain>,
	neighborhood: Neighborhood
	changeBlockName: (_: NewBlockData) => void
	changeLotName: (_: NewLotData) => void
	changeLotPrice: (_: NewLotPriceData) => void
	changeLotStatus: (_: NewLotStatusData) => void
	changeLotSalesman: (_: NeighborhoodLotSalesman) => void
	changeLotCustomer: (_: NeighborhoodLotCustomer) => void
	changeLotCoCustomer: (_: NeighborhoodLotCoCustomer) => void
	changeLotAdministrator: (_: NeighborhoodLotAdministrator) => void
	administrators: Array<BasicAdministrator>
	salesmen: Array<BasicPerson>
	customers: Array<BasicPerson>
}

export default MasterContext

export type SelectedLot = { block: number; lot: number }

export type Terrain = {
	name: string | null
	coordinates: Array<Coordinate>
}

export type BasicPerson = {
	id: string
	fullname: string
}

export interface BasicAdministrator extends BasicPerson {
	color: string
}
