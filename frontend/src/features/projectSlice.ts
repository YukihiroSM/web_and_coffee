import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProject,
  deleteSingleProject,
  getAllProjects,
  getSingleProject,
} from '../api/project';
import { BACKEND_KEYS } from '../constants';
import { CreateProject, ProjectState } from '../types';

export const createProjectThunk = createAsyncThunk(
  BACKEND_KEYS.PROJECT_CREATE,
  async (project: CreateProject, { rejectWithValue }) => {
    try {
      const response = await createProject(project);
      return response;
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
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleProjectThunk = createAsyncThunk(
  BACKEND_KEYS.PROJECT_VIEW + '/view',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getSingleProject(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSingleProjectThunk = createAsyncThunk(
  BACKEND_KEYS.PROJECT_DELETE + '/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteSingleProject(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: { data: [], metadata: { total: 0 } },
    project: null,
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
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSingleProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteSingleProjectThunk.rejected, (state, action) => {
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
        state.error = null;
        state.projects = action.payload;
      })
      .addCase(getAllProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSingleProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.project = action.payload;
      })
      .addCase(getSingleProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
