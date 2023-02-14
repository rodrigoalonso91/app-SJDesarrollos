import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods"
import addRowInDatabase from "@web/api_calls/addRowInDatabase"

export default async function addNeighborhood(neighborhood: Neighborhood) {
	await addRowInDatabase("barrios", neighborhood)
}
