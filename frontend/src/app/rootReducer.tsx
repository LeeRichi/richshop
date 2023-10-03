import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/product/productSlice';
import favoriteReducer from '../features/favorite/favoriteSlice'
import userReducer from '../features/user/userSlice'

const rootReducer = combineReducers({
  products: productReducer,
  favorites: favoriteReducer,
  cart: cartReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
