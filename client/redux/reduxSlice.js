import React from "react";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
  customerInfo: [],
  adminInfo: [],
};

export const reduxSlice = createSlice({
  name: "iptv",
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
    customerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
    adminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },
  },
});

export const {
  addToCart,
  incrementProduct,
  decrementCart,
  deleteCart,
  resetCart,
  customerInfo,
  adminInfo,
} = reduxSlice.actions;

export default reduxSlice.reducer;
