import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from: "",
  to: ""
}
export const nearBySlice = createSlice({
  name: "nearBy",
  initialState,
  reducers: {
    updateFrom: (state, action) => {
      return ({ ...state, from: action.payload })
    },
    updateTo: (state, action) => {
      return ({ ...state, to: action.payload })
    }
  }
})

export const { updateFrom, updateTo } = nearBySlice.actions;

export default nearBySlice.reducer;