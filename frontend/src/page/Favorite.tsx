import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Product } from '../interface/ProductInterface';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/favorite/favoriteSlice';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = (product: Product) => favorites.some((favProduct) => favProduct.id === product.id);

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favorites.map((favorite) => (
          <div key={favorite.id} style={{ flex: '0 0 30%', position: 'relative' }}>
            <img src={favorite.images[0]} alt={favorite.title} style={{ width: '100%' }} />
            <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
              <CloseIcon onClick={() => handleToggleFavorite(favorite)} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <h3>{favorite.title}</h3>
              <p>{favorite.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
