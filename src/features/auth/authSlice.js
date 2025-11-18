import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getProfileApi, updateProfileApi } from '../../services/userApi';

const initialState = {
    token: null,
    user: null,
    remember: false,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password, remember }, { rejectWithValue }) => {
        try {
            const token = await loginApi({ email, password });
            
            if (remember) {
                localStorage.setItem('token', token);
            }
            
            const user = await getProfileApi(token);
            
            return { token, user, remember };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const restoreSession = createAsyncThunk(
    'auth/restoreSession',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                return rejectWithValue('No token found');
            }
            
            const user = await getProfileApi(token);
            return { token, user, remember: true };
        } catch (error) {
            localStorage.removeItem('token');
            return rejectWithValue(error.response?.data ||'Session expired');
        }
    }
);

export const updateUserName = createAsyncThunk(
    'auth/updateUserName',
    async ({ userName }, { rejectWithValue }) => {
        try {
            await updateProfileApi({ userName });
            return userName;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Update failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            state.remember = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.remember = action.payload.remember;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        
        builder
            .addCase(restoreSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.remember = action.payload.remember;
            })
            .addCase(restoreSession.rejected, (state) => {
                state.loading = false;
            });
        
        builder
            .addCase(updateUserName.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.userName = action.payload;
                }
            });
    },
});

export const { logout } = authSlice.actions;

// ✅ Nouveaux selectors
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;