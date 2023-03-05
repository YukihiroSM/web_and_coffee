import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import projectReducer from '../features/projectSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
