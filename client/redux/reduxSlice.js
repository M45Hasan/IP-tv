import React from "react";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
};

export const reduxSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
    },
    incrementProduct: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementCart: (state, action) => {
      const item = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteCart: (state, action) => {
      state.product = state.product.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state, action) => {
      state.product = [];
    },
  },
});

export const {
  addToCart,
  incrementProduct,
  decrementCart,
  deleteCart,
  resetCart,
} = reduxSlice.actions;

export default reduxSlice.reducer;
