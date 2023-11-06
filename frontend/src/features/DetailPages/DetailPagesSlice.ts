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
      state.isProductManageOpen = true;
    },
    closeProductManage: (state) =>
    {
      state.isProductManageOpen = false;
    },
    openUserManage: (state) =>
    {
      state.isUserManageOpen = true;
    },
    closeUserManage: (state) =>
    {
      state.isUserManageOpen = false;
    },
    openOrderManage: (state) =>
    {
      state.isOrderManageOpen = true;
    },
    closeOrderManage: (state) =>
    {
      state.isOrderManageOpen = false;
    },
  }
});

export const {
  openOrderHistory, closeOrderHistory, openFavorite, closeFavorite, openCart, closeCart,
  toggleSidebar, openProductManage, closeProductManage, openUserManage, closeUserManage,
  openOrderManage, closeOrderManage,
} = detailPagesSlice.actions;

export default detailPagesSlice.reducer;
