import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserProjectsState } from '../types';
import { getUserProjects } from '../api/user';
import { BACKEND_KEYS } from '../constants';

export const getUserProjectsThunk = createAsyncThunk(
  BACKEND_KEYS.USER_PROJECTS,
  async (params: URLSearchParams, { rejectWithValue }) => {
    try {
      const response = await getUserProjects(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState: {
    projects: { data: [], metadata: { total: 0 } },
    success: false,
    loading: false,
    error: null,
  } as UserProjectsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.projects = action.payload;
      })
      .addCase(getUserProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
