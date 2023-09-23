import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/product/productSlice';
import favoriteReducer from '../features/favorite/favoriteSlice'

const rootReducer = combineReducers({
  products: productReducer,
  favorites: favoriteReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
