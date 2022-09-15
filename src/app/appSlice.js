import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: true,
  language: 'en'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayLoading: (state, action) => {
      state.display = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});

export const { displayLoading, setLanguage } = appSlice.actions;

export const isLoading = (state) => state.app.display;
export const getLanguage = (state) => state.app.language;

export default appSlice.reducer;
