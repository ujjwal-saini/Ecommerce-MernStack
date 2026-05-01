import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    //  Add
    addToWishlist: (state, action) => {
      const exists = state.items.find(
        (i) => i._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    //  Remove
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );
    },

    //  SET (IMPORTANT FIX)
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {  addToWishlist, removeFromWishlist,  setWishlist,} = wishlistSlice.actions;

export default wishlistSlice.reducer;