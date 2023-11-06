import { createSlice } from '@reduxjs/toolkit';

const detailPagesSlice = createSlice({
  name: 'detailPages',
  initialState: {
    isOrderHistoryOpen: false,
    isCartOpen: false,
    isSidebarOpen: true,
  },
  reducers: {
    openOrderHistory: (state) =>
    {
      state.isOrderHistoryOpen = true;
    },
    closeOrderHistory: (state) =>
    {
      state.isOrderHistoryOpen = false;
    },
    openCart: (state) =>
    {
      state.isCartOpen = true;
    },
    closeCart: (state) =>
    {
      state.isCartOpen = false;
    },
    // openSidebar: (state) =>
    // {
    //   state.isSidebarOpen = true;
    // },
    // closeSidebar: (state) =>
    // {
    //   state.isSidebarOpen = false;
    // },
    toggleSidebar: (state) =>
    {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  }
});

export const { openOrderHistory, closeOrderHistory, openCart, closeCart, toggleSidebar} = detailPagesSlice.actions;

export default detailPagesSlice.reducer;
