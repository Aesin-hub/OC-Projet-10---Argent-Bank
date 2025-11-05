import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    remember: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, remember } = action.payload;
            state.token = token;
            state.remember = !!remember;
        },

        logout(state) {
            state.token = null;
            state.remember = false;
        },
    },
});      

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;