import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import { useCallback, useState } from "react"

export default function useNeighborhood(initial: Neighborhood) {
	const [neighborhood, setNeighborhood] = useState<Neighborhood>(initial)

	const changeLotName = useCallback(
		({ name, block, lot }: { name: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].name = name
				return substitute
			})
		}, []
	)

	const changeBlockName = useCallback(
		({ name, block }: { name: string; block: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].name = name
				return substitute
			})
		}, []
	)

	const changeLotPrice = useCallback(
		({ price, block, lot }: { price: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].price = price
				return substitute
			})
		}, []
	)

	const changeLotStatus = useCallback(
		({ status, block, lot }: { status: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].status = status
				return substitute
			})
		}, []
	)

	const changeLotSalesman = useCallback(
		({ salesman, block, lot }: { salesman: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].salesman = salesman
				return substitute
			})
		}, []
	)

	const changeLotCustomer = useCallback(
		({ customer, block, lot }: { customer: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].customer = customer
				return substitute
			})
		}, []
	)

	return {
		neighborhood,
		changeBlockName,
		changeLotName,
		changeLotPrice,
		changeLotStatus,
		changeLotSalesman,
		changeLotCustomer
	}
}

const clone = <T>(obj: T) : T => JSON.parse(JSON.stringify(obj))
