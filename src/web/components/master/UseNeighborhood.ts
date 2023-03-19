import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import { useCallback, useState } from "react"

export default function useNeighborhood(initial: Neighborhood) {
	const [neighborhood, setNeighborhood] = useState<Neighborhood>(initial)
	const [hasChanged, setHasChanged] = useState(false)

	const changeLotName = useCallback(
		({ name, block, lot }: { name: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].name = name.length ? name : null
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeBlockName = useCallback(
		({ name, block }: { name: string; block: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].name = name.length ? name : null
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotPrice = useCallback(
		({ price, block, lot }: { price: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].price = price
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotStatus = useCallback(
		({ status, block, lot }: { status: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].status = status
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotSalesman = useCallback(
		({ salesman, block, lot }: { salesman: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].salesman = salesman
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotCustomer = useCallback(
		({ customer, block, lot }: { customer: string; block: number; lot: number }) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].customer = customer
				setHasChanged(true)
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
		changeLotCustomer,

		hasChanged,
		setHasChanged
	}
}

const clone = <T>(obj: T) : T => JSON.parse(JSON.stringify(obj))
