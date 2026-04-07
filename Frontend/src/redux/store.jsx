import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; 
import productReducer from "./productSlice"
0
export const store = configureStore({
  reducer: {
    cart: cartReducer,
      product: productReducer
  }
});
