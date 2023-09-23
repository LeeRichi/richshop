import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interface/ProductInterface';

interface FavoriteState {
  favorites: Product[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(product => product.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export const selectFavorites = (state: { favorites: FavoriteState }) => state.favorites.favorites;

export default favoriteSlice.reducer;
