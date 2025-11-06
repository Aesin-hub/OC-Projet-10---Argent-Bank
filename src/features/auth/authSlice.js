import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    remember: false,
    firstName: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, remember, firstName } = action.payload;
            state.token = token;
            state.remember = !!remember;
            if (firstName) state.firstName = firstName;
        },

        logout(state) {
            state.token = null;
            state.remember = false;
            state.firstName = null;
        },
    },
});      

export const { setCredentials, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectFirstName = (state) => state.auth.firstName;

export default authSlice.reducer;