import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Product } from '../interface/ProductInterface';
// import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/favorite/favoriteSlice';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
// import { setFavoriteCount } from '../features/favorite/favoriteSlice';
import { FavoriteInterface } from '../interface/FavoriteInterface';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.userDetails?.favorites)
  console.log(favorites)
  // const favorites = useSelector(selectFavorites);
  // const isFavorite = (product: Product) => favorites.some((favProduct) => favProduct.id === product.id);

  // const handleToggleFavorite = (product: Product) => {
  //   if (product.id) {
  //     if (isFavorite(product)) {
  //       dispatch(removeFromFavorites(product.id));
  //     } else {
  //       dispatch(addToFavorites(product));
  //     }
  //   }
  // };

  const newFavoriteCount = favorites?.length;
  // dispatch(setFavoriteCount(newFavoriteCount));

  return (
    <div style={{marginLeft: '6%'}}>
      <h2>Favorites</h2>
      {newFavoriteCount ?
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {favorites?.map((favorite: FavoriteInterface) => (
            <div key={favorite.product?.id} style={{ flex: '0 0 30%', position: 'relative' }}>
              <img src={favorite.product?.images[0]} alt={favorite.product?.title} style={{ width: '100%' }} />
              <div style={{ position: 'absolute', top: '5px', right: '5px', border: '1px solid black', cursor: 'pointer' }}>
                {/* <CloseIcon onClick={() => handleToggleFavorite(favorite)} /> */}
              </div>
              <div style={{ marginTop: '10px' }}>
                <Typography variant="h6">{favorite.product?.title}</Typography>
                <Typography>{favorite.product?.description}</Typography>
                <Typography variant="subtitle1">{`$${favorite.product?.price}`}</Typography>
              </div>
            </div>
          ))}
        </div>
      : <div>your do not have favorite items yet</div>}
    </div>
  );
};

export default ProductDetail;
