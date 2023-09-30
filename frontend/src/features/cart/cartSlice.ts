import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interface/ProductInterface';

interface CartState {
  cartItems: Product[];
  cartCount: number;
}

const initialState: CartState = {
  cartItems: [],
  cartCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingProduct = state.cartItems.find(item => item.id === id);

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        const productWithQuantity = { ...action.payload, quantity: 1 };
        state.cartItems.push(productWithQuantity);
      }

      state.cartCount += 1; 
    },
    deleteFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productIdToRemove.id);
      state.cartCount -= 1;
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    updateProductQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.cartItems.find(item => item.id === productId);

      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    },
  }
});

export const { addToCart, deleteFromCart, setCartCount, updateProductQuantity } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;
export default cartSlice.reducer;
