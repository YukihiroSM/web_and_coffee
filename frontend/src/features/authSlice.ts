import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, State } from '../types';
import { registerUser, loginUser } from '../api/user';
import { BACKEND_KEYS } from '../constants';

export const register = createAsyncThunk(
  BACKEND_KEYS.REGISTER_USER,
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await registerUser(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  BACKEND_KEYS.LOGIN_USER,
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await loginUser(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    success: false,
    loading: false,
    error: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
