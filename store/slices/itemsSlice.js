import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "2022-12-25": [
    {
      id: 1576996323453,
      name: "Radagon has come",
      date: "2022-12-25",
    },
  ],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    createEmptyItem: (state, { payload }) => {
      state[payload] = [];
    },
    deleteEmptyItems: (state, { payload }) => {
      const { todayString, day } = payload;
      const filledItems = Object.entries(state).filter(
        ([key, value]) =>
          value.length !== 0 ||
          (key === todayString && day.dateString === todayString)
      );
      return Object.fromEntries(filledItems);
    },
    addNewItem: (state, { payload }) => {
      state[payload].push({ id: Date.now(), name: "New Item", date: payload });
    },
    updateItem: (state, { payload }) => {
      const uneditedItems = Object.values(state[payload.currentDate]).filter(
        (item) => item.id !== payload.editedItem.id
      );
      state[payload.currentDate] = [...uneditedItems, payload.editedItem];
    },
  },
});

// Action creators are generated for each case reducer function
export const { createEmptyItem, deleteEmptyItems, addNewItem, updateItem } =
  itemsSlice.actions;

export default itemsSlice.reducer;
