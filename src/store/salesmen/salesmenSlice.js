import { createSlice } from '@reduxjs/toolkit';

export const salesmenSlice = createSlice({
    name: 'salesmen',
    initialState: {
        
    },
    reducers: {
        increment: (state, /* action */ ) => {
            
        },
    }
});

export const { increment } = salesmenSlice.actions;