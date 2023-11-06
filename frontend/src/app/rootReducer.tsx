import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/product/productSlice';
import userReducer from '../features/user/userSlice'
import allUserRudcer from '../features/user/allUserSlice';
import orderReducer from '../features/order/orderSlice'
import orderProductReducer from '../features/order/orderProductSlice';
import detailPagesReducer from '../features/DetailPages/DetailPagesSlice'

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  allUser: allUserRudcer,
  order: orderReducer,
  orderProduct: orderProductReducer,
  DetailPages: detailPagesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
