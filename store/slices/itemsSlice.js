import { createSlice } from "@reduxjs/toolkit";
import { getFancyPhrase } from "../../helpers";

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
      state[payload].push({
        id: Date.now(),
        name: getFancyPhrase(),
        date: payload,
      });
    },
    deleteItem: (state, { payload }) => {
      const { id, date } = payload;
      state[date] = state[date].filter((item) => item.id !== id);
    },
    upsertItem: (state, { payload }) => {
      const { currentDate, editedItem } = payload;
      if (!editedItem.id) {
        editedItem.id = Date.now();
        editedItem.date = currentDate;
      }
      const uneditedItems = Object.values(state[currentDate]).filter(
        (item) => item.id !== editedItem.id
      );
      state[currentDate] = [...uneditedItems, editedItem];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createEmptyItem,
  deleteEmptyItems,
  addNewItem,
  deleteItem,
  upsertItem,
} = itemsSlice.actions;

export default itemsSlice.reducer;
