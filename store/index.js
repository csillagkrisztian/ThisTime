import { configureStore } from "@reduxjs/toolkit";
import editReducer from "./slices/editSlice";
import itemsReducer from "./slices/itemsSlice";
import currentReducer from "./slices/currentSlice";

export const store = configureStore({
  reducer: {
    edit: editReducer,
    items: itemsReducer,
    current: currentReducer,
  },
});
