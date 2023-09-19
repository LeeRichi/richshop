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
    // Add other actions to manage the cart state if needed
  }
});

export const { addToCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;
export default cartSlice.reducer;
