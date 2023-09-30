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

interface ProductWithQuantity extends Product {
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //  addToCart: (state, action: PayloadAction<Product>) => {
    //   const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

    //   if (existingProductIndex !== -1) {
    //     state.cartItems[existingProductIndex].quantity = (state.cartItems[existingProductIndex].quantity || 0) + 1;
    //   } else {
    //     const productWithQuantity = { ...action.payload, quantity: 1 };
    //     state.cartItems.push(productWithQuantity);
    //   }

    //   state.cartCount += 1;
    // },
    addToCart: (state, action: PayloadAction<Product>) => {
  const { id } = action.payload;
  const existingProduct = state.cartItems.find(item => item.id === id);

  if (existingProduct) {
    // If the product exists in the cart, increment its quantity
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    const productWithQuantity = { ...action.payload, quantity: 1 };
    state.cartItems.push(productWithQuantity);
  }

  state.cartCount += 1; // Increment cartCount when an item is added
},
    deleteFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productIdToRemove.id);
      state.cartCount -= 1; // Decrement cartCount when an item is removed
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  }
});

export const { addToCart, deleteFromCart, setCartCount } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;
export default cartSlice.reducer;
