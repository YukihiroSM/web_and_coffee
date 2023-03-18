import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserProjectsState } from '../types';
import { createUserResume, getUserProjects, getUserResume } from '../api/user';
import { BACKEND_KEYS } from '../constants';

export const getUserProjectsThunk = createAsyncThunk(
  BACKEND_KEYS.USER_PROJECTS,
  async (params: URLSearchParams, { rejectWithValue }) => {
    try {
      const response = await getUserProjects(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserResumeThunk = createAsyncThunk(
  BACKEND_KEYS.USER_RESUME_CREATE,
  async (resume: FormData, { rejectWithValue }) => {
    try {
      const response = await createUserResume(resume);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserResumeThunk = createAsyncThunk(
  BACKEND_KEYS.USER_RESUME_GET,
  async (nothing: string, { rejectWithValue }) => {
    try {
      const response = await getUserResume();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    projects: { data: [], metadata: { total: 0 } },
    resume: null,
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
      })
      .addCase(getUserResumeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserResumeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resume = action.payload;
      })
      .addCase(getUserResumeThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(createUserResumeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserResumeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createUserResumeThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
