import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setCart: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find(
        (item) => item._id === product._id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i._id !== action.payload
        );
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    }

  }
});

export const {
  setCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;