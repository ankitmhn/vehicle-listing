import { createSlice } from "@reduxjs/toolkit";

export const rightPaneSlice = createSlice({
  name: "rightPane",
  initialState: {
    vehicle: {},
  },
  reducers: {
    clearSelection: (state) => {
      state.vehicle = {};
    },
  },
});

export const { clearSelection } = rightPaneSlice.actions;
export default rightPaneSlice.reducer;
