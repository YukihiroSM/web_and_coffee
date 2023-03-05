import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProject, getAllProjects } from '../api/project';
import { BACKEND_KEYS } from '../constants';
import { CreateProject, ProjectState } from '../types';

export const createProjectThunk = createAsyncThunk(
  BACKEND_KEYS.PROJECT_CREATE,
  async (project: CreateProject, { rejectWithValue }) => {
    try {
      const response = await createProject(project);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProjectsThunk = createAsyncThunk(
  BACKEND_KEYS.PROJECT_ALL,
  async (params: URLSearchParams, { rejectWithValue }) => {
    try {
      const response = await getAllProjects(params);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectsSlice = createSlice({
  name: 'project',
  initialState: {
    projects: { data: [], metadata: { total: 0 } },
    success: false,
    loading: false,
    error: null,
  } as ProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.projects = action.payload;
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(getAllProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.projects = action.payload;
      })
      .addCase(getAllProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
