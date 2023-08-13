import {Segment} from "@web/domain/types/Segment"

export class MasterBuildingError extends Error {
	errors: Array<Segment>

	constructor(message: string, errors: Array<Segment>) {
		super(message)
		this.errors = errors
	}
}