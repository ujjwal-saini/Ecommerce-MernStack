import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; 
0
export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});
