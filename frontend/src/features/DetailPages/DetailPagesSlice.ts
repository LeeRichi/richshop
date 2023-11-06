import { createSlice } from '@reduxjs/toolkit';

const detailPagesSlice = createSlice({
  name: 'detailPages',
  initialState: {
    isOrderHistoryOpen: false,
    isCartOpen: false,
    isSidebarOpen: true,
    isFavoriteOpen: false,
    isProductManageOpen: false,
    isUserManageOpen: false,
    isOrderManageOpen: false,

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
    openFavorite: (state) =>
    {
      state.isFavoriteOpen = true;
    },
    closeFavorite: (state) =>
    {
      state.isFavoriteOpen = false;
    },
    openCart: (state) =>
    {
      state.isCartOpen = true;
    },
    closeCart: (state) =>
    {
      state.isCartOpen = false;
    },
    toggleSidebar: (state) =>
    {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openProductManage: (state) =>
    {
      state.isCartOpen = true;
    },
    closeProductManage: (state) =>
    {
      state.isCartOpen = false;
    },
    openUserManage: (state) =>
    {
      state.isCartOpen = true;
    },
    closeUserManage: (state) =>
    {
      state.isCartOpen = false;
    },
    openOrderManage: (state) =>
    {
      state.isCartOpen = true;
    },
    closeOrderManage: (state) =>
    {
      state.isCartOpen = false;
    },
  }
});

export const {
  openOrderHistory, closeOrderHistory, openFavorite, closeFavorite, openCart, closeCart,
  toggleSidebar, openProductManage, closeProductManage, openUserManage, closeUserManage,
  openOrderManage, closeOrderManage,
} = detailPagesSlice.actions;

export default detailPagesSlice.reducer;
