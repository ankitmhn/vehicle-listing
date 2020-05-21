import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const leftPaneSlice = createSlice({
  name: "leftPane",
  initialState: {
    vehicles: [],
    selectedVehicleId: "",
    loading: false,
    error: false,
    moreData: true,
    page: 1,
  },
  reducers: {
    onVehicleSelect: (state, action) => {
      state.selectedVehicleId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMoreData: (state, action) => {
      state.moreData = action.payload;
    },
    appendVehicles: (state, action) => {
      state.vehicles.push(...action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

//export redux actions
export const {
  onVehicleSelect,
  setLoading,
  setError,
  setMoreData,
  setPage,
  appendVehicles,
} = leftPaneSlice.actions;

//export THUNKS
export const fetchMoreVehicles = (page) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get("http://localhost:8000/vehicles", {
        params: { _page: page, _limit: 10 },
      });
      dispatch(setLoading(false));
      console.log(response.data);
      if (response.data.length > 0) dispatch(appendVehicles(response.data));
      else dispatch(setMoreData(false));
    } catch (e) {
      dispatch(setError(true));
      console.log("Error", e);
    }
  };
};
//export the combined reducer
export default leftPaneSlice.reducer;
