import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  language: 'en',
  errorType: undefined
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayLoading: (state, action) => { state.loading = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },
    setErrorType: (state, action) => { state.errorType = action.payload }
  }
});

export const { displayLoading, setLanguage, setErrorType } = appSlice.actions;

export const isLoading = (state) => state.app.loading;
export const getLanguage = (state) => state.app.language;
export const getErrorType = (state) => state.app.errorType;

export default appSlice.reducer;
