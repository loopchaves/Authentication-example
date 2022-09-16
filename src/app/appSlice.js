import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  language: 'en',
  alert: {
    msg: undefined,
    type: ''
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayLoading: (state, action) => { state.loading = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },
    setAlert: (state, action) => { state.alert = action.payload }
  }
});

export const { displayLoading, setLanguage, setAlert } = appSlice.actions;

export const isLoading = (state) => state.app.loading;
export const getLanguage = (state) => state.app.language;
export const getAlert = (state) => state.app.alert;

export default appSlice.reducer;
