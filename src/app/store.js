import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice
  }
});
