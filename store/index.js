import { configureStore } from "@reduxjs/toolkit";
import editReducer from "./slices/editSlice";
import itemsReducer from "./slices/itemsSlice";

export const store = configureStore({
  reducer: {
    edit: editReducer,
    items: itemsReducer,
  },
});
