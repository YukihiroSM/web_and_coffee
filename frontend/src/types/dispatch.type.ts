import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../app/store';
import { AnyAction } from '@reduxjs/toolkit';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
