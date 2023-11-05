import { createSlice } from '@reduxjs/toolkit';

const detailPagesSlice = createSlice({
  name: 'detailPages',
  initialState: {
    isOrderHistoryOpen: false,
  },
  reducers: {
    openOrderHistory: (state) => {
      state.isOrderHistoryOpen = true;
    },
    closeOrderHistory: (state) => {
      state.isOrderHistoryOpen = false;
    },
  },
});

export const { openOrderHistory, closeOrderHistory } = detailPagesSlice.actions;

export default detailPagesSlice.reducer;
