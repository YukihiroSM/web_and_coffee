import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../app/store';
import { AnyAction } from '@reduxjs/toolkit';
import { Project } from './project.type';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export interface State {
  success: boolean;
  loading: boolean;
  error: any;
}

export interface ProjectState extends State {
  projects: { data: Project[]; metadata: { total: number } };
}

export interface UserProjectsState extends State {
  projects: { data: Project[]; metadata: { total: number } };
}

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
