import { setIsActivatedForm } from './activeFormSlice'

export const displayForm = (value) => {

    return async (dispatch) => {
        await dispatch( setIsActivatedForm({ value }) );
    }
}   