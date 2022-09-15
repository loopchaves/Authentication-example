import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: true
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    displayLoading: (state, action) => {
      state.display = action.payload;
    }
  }
});

export const { displayLoading } = loadingSlice.actions;

export const isLoading = (state) => state.loading.display;

export default loadingSlice.reducer;
