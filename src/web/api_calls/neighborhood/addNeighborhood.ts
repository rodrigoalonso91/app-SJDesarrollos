import { API_PATH_COLLECTIONS } from "@web/constants/collections";
import { Neighborhood } from "@web/domain/TransformXmlToNeighborhoods";

export default async function addNeighborhood(neighborhood: Neighborhood) {
  const result = await fetch(`api/${API_PATH_COLLECTIONS["neighborhoods"]}`, {
    method: "POST", body: JSON.stringify(neighborhood)
  });

  return await result.json()
}
