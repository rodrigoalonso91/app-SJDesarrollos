import { type } from "os"

export type HexadecimalColor = `#${string}`

export interface StatusColor {
  [Disponible : string]: HexadecimalColor,
  [Vendido : string]: HexadecimalColor,
  [Reservado : string]: HexadecimalColor,
  [Financiado : string]: HexadecimalColor,
  [NoDisponible : string]: HexadecimalColor
}

export interface DbCollectionInSpanish {
  [salesmen : string]: string,
  [customer : string]: string,
  [administrators : string]: string
}

export type DbCollection = 'salesmen' | 'customers' | 'administrators' | 'neighborhoods'

export interface ApiPathCollection {
  [salesmen : string]: string,
  [customer : string]: string,
  [administrators : string]: string,
  [neighborhoods : string]: string
}

export type StatusOption = 'Disponible' | 'Vendido' | 'Reservado' | 'Financiado' | 'No Disponible';

export interface DataSourceActionsTypes {
  "UPDATE" : string
}

export type LotTableRow = {
  name: string | null,
  lot: string,
  price: string,
  status: StatusOption,
  customer: string | null,
  coCustomer: string | null,
  salesman: string | null,
  details: string | null,
}

interface Person {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
}

export type PersonId = {
  id: Pick<Person, 'id'>
}

export interface LotAdministrator extends Person {
  color: HexadecimalColor
}

export interface Salesman extends Person {}

export interface Customer extends Person {
  company: string
}

export type PersonDbRow = LotAdministrator | Salesman | Customer

interface BlockNumber {
	block: number
}

interface LotNumber extends BlockNumber {
	lot: number
}

interface NewLotData extends LotNumber {
	name: string,
}

interface NewBlockData extends BlockNumber {
	name: string
}

interface NewLotPriceData extends LotNumber {
	price: string
}

interface NewLotStatusData extends LotNumber {
	status: StatusOption
}

interface BasicDataPerson {
  id: string,
  fullname: string,
}

export interface BasicDataSalesman extends BasicDataPerson { }

export interface BasicDataCustomer extends BasicDataPerson { }

export interface BasicDataCoCustomer extends BasicDataPerson { }

export interface BasicDataAdministrator extends BasicDataPerson {
  color: HexadecimalColor;
}

export interface NeighborhoodLotAdministrator extends LotNumber {
  person: BasicDataAdministrator;
}

export interface NeighborhoodLotSalesman extends LotNumber {
  person: BasicDataSalesman
}

export interface NeighborhoodLotCustomer extends LotNumber {
  person: BasicDataCustomer
}

export interface NeighborhoodLotCoCustomer extends LotNumber {
  person: BasicDataCoCustomer
}

export interface Neighborhood {
  id: string
	name: string
	blocks: Array<Block>
}