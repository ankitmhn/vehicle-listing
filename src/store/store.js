import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import leftPaneSlice from "./leftPaneSlice";
import rightPaneSlice from "./rightPaneSlice";

export default configureStore({
  reducer: {
    leftPane: leftPaneSlice,
    rightPane: rightPaneSlice,
  },
});
