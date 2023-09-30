import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../interface/ProductInterface';

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productIdToRemove.id);
    }
  }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;
export default cartSlice.reducer;
