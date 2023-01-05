import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toJSON().slice(0, 10),
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    changeCurrentDate: (state, { payload }) => {
      state.date = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCurrentDate } = currentSlice.actions;

export default currentSlice.reducer;
