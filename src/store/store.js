import nearBySlice from "./NearBySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { nearBy: nearBySlice },
})
