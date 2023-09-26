import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interface/ProductInterface';

interface ProductState {
  products: Product[];
  categories: string[]; // Add categories

}

const initialState: ProductState = {
  products: [],
  categories: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;

      state.categories = Array.from(new Set(action.payload.map(product => product.category)));
    },
  },
});
export const { setProducts } = productSlice.actions;
export const selectProducts = (state: { products: ProductState }): Product[] => state.products.products;
export const selectCategories = (state: { products: ProductState }) => state.products.categories;


export default productSlice.reducer;
