import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    remember: false,
    firstName: null,
    lastName: null,
    userName: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, remember, firstName, lastName, userName } = action.payload;
            state.token = token;
            state.remember = !!remember;
            if (firstName) state.firstName = firstName;
            if (lastName) state.lastName = lastName;
            if (userName) state.userName = userName;
        },

        updateUserName: (state, action) => {
            state.userName = action.payload;
        },

        logout(state) {
            state.token = null;
            state.remember = false;
            state.firstName = null;
            state.lastName = null;
            state.userName = null;
        },
    },
});      

export const { setCredentials, updateUserName, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectFirstName = (state) => state.auth.firstName;
export const selectLastName = (state) => state.auth.lastName;
export const selectUserName = (state) => state.auth.userName;

export default authSlice.reducer;