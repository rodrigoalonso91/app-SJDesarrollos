import { Segment } from "@web/domain/types/Segment"

export type CategorizedSegments = {
	externals: Array<Segment>
	internals: Array<Segment>
}
