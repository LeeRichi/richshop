import { createSlice } from '@reduxjs/toolkit';

const detailPagesSlice = createSlice({
  name: 'detailPages',
  initialState: {
    isOrderHistoryOpen: false,
    isCartOpen: false,
  },
  reducers: {
    openOrderHistory: (state) => {
      state.isOrderHistoryOpen = true;
    },
    closeOrderHistory: (state) => {
      state.isOrderHistoryOpen = false;
      },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openOrderHistory, closeOrderHistory, openCart, closeCart } = detailPagesSlice.actions;

export default detailPagesSlice.reducer;
