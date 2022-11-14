import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    accessToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, actions) {
            const data = actions.payload
            return {
                ...state,
                ...data
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
