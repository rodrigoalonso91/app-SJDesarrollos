import refineRawSegments from "@web/domain/cleanup/RefineRawSegments"
import {MasterBuildingError} from "@web/domain/MasterBuildingError"
import transformBlockSidesToLots from "@web/domain/TransformBlockSidesToLots"
import transformSegmentsToLotSides from "@web/domain/TransformSegmentsToLotSides"
import transformXmlToLines from "@web/domain/TransformXmlToLines"
import {Coordinate} from "@web/domain/types/Coordinate"
import {Segment} from "@web/domain/types/Segment"
import {lineToSegments} from "@web/domain/utils/LineUtils"
import { BasicDataAdministrator, BasicDataCoCustomer, BasicDataCustomer, BasicDataSalesman } from "./types/types"

export default function transformXmlToNeighborhoods(xml: string) {
	
	const raw = transformXmlToLines(xml)
	const segments = refineRawSegments(raw)
	const results = segments.map(transformSegmentsToLotSides)
	const errors = results
		.filter((x) => x.error)
		.map(
			(x) =>
				({
					lines: [...x.segments!.internals, ...x.segments!.externals],
					error: x.error as string,
					faulty: x.faulty as Array<Segment>
				} as BlockError)
		)

	const blockErrors: Array<BlockError> = []
	const blocks: Array<Block> = results.filter((x) => x.error === null).map((x) => x.block!).map((block) => {
		try {
			const lots = transformBlockSidesToLots(block.lots).map(
				(lot) => ({name: null, coordinates: lot, status: "Disponible", salesman: null, customer: null}))
			return {name: null, coordinates: block.coordinates, lots}
		} catch (e: any) {
			const lines = [...block.lots.internals.flatMap(lineToSegments), ...block.lots.externals.flatMap(lineToSegments)]
			if (e instanceof MasterBuildingError)
				blockErrors.push({lines, error: e.message as string, faulty: e.errors})
			else if (e instanceof Error)
				blockErrors.push({lines, error: e.message as string, faulty: []})
			else throw e
			return null
		}
	}).filter(x => x) as Array<Block>
	const neighborhood: Neighborhood = {name: "", blocks: blocks}

	return {neighborhood, errors: [...errors, ...blockErrors]}
}

export type Neighborhood = {
	name: string
	blocks: Array<Block>
}

export type Block = {
	name: string | null
	coordinates: Array<Coordinate>
	lots: Array<Lot>
}

export type Lot = {
	name: string | null
	coordinates: Array<Coordinate>
	price?: string
	status: string
	salesman: BasicDataSalesman | null
	customer: BasicDataCustomer | null
	coCustomer: BasicDataCoCustomer | null
	administrator: BasicDataAdministrator | null
}

export type BlockError = {
	lines: Array<Segment>
	faulty: Array<Segment>
	error: string
}
