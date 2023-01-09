import { configureStore } from '@reduxjs/toolkit'
import { activeFormSlice } from './form'

export const store = configureStore({

    reducer: {
        isActivatedForm: activeFormSlice.reducer
    }
});