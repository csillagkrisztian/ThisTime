import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  editingItem: {},
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.editingItem = {};
      state.editMode = !state.editMode;
    },
    editItem: (state, { payload }) => {
      state.editingItem = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editItem, toggleEditMode } = editSlice.actions;

export default editSlice.reducer;
