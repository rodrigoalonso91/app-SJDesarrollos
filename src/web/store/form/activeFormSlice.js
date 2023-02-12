import { createSlice } from '@reduxjs/toolkit';

export const activeFormSlice = createSlice({
    name: 'activeForm',
    initialState: {
        isFormActivated: false
    },
    reducers: {
        setIsActivatedForm: ( state , { payload } ) => {
            state.isFormActivated = payload.value
        },
    }
});

export const { setIsActivatedForm } = activeFormSlice.actions;