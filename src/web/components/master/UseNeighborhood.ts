import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import { NewBlockData, NewLotPriceData, NewLotStatusData, NewLotData, NeighborhoodLotSalesman, NeighborhoodLotCustomer, NeighborhoodLotAdministrator, NeighborhoodLotCoCustomer } from "@web/domain/types/types"
import { useCallback, useState } from "react"

export default function useNeighborhood(initial: Neighborhood) {

	const [neighborhood, setNeighborhood] = useState<Neighborhood>(initial)
	const [hasChanged, setHasChanged] = useState(false)

	const changeLotName = useCallback(
		({ name, block, lot }: NewLotData) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].name = name.length ? name : null
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeBlockName = useCallback(
		({ name, block }: NewBlockData) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].name = name.length ? name : null
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotPrice = useCallback(
		({ price, block, lot }: NewLotPriceData) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].price = price
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotStatus = useCallback(
		({ status, block, lot }: NewLotStatusData) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].status = status
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotSalesman = useCallback(
		({ person, block, lot }: NeighborhoodLotSalesman) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].salesman = person
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotCustomer = useCallback(
		({ person, block, lot }: NeighborhoodLotCustomer) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].customer = person
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotCoCustomer = useCallback(
		({ person, block, lot }: NeighborhoodLotCoCustomer) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].coCustomer = person
				setHasChanged(true)
				return substitute
			})
		}, []
	)

	const changeLotAdministrator = useCallback(
		({ person, block, lot }: NeighborhoodLotAdministrator) => {
			setNeighborhood((neighborhood) => {
				const substitute = clone(neighborhood)
				substitute.blocks[block].lots[lot].administrator = person
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
		changeLotCoCustomer,
		changeLotAdministrator,
		hasChanged,
		setHasChanged
	}
}

const clone = <T>(obj: T) : T => JSON.parse(JSON.stringify(obj))
