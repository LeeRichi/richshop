import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interface/ProductInterface';

interface FavoriteState {
    favorites: Product[];
    favoriteCount: number;
}

const initialState: FavoriteState = {
    favorites: [],
    favoriteCount: 0,
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
    setFavoriteCount: (state, action: PayloadAction<number>) => {
      state.favoriteCount = action.payload;
    },
    clearFavorite(state) { 
      state.favorites = [];
      state.favoriteCount = 0;
    }
  },
});

export const { addToFavorites, removeFromFavorites, setFavoriteCount, clearFavorite } = favoriteSlice.actions;
export const selectFavorites = (state: { favorites: FavoriteState }) => state.favorites.favorites;

export default favoriteSlice.reducer;
