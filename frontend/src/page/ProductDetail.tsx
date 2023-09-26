import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Button, Typography, Grid, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/favorite/favoriteSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { setFavoriteCount } from '../features/favorite/favoriteSlice';


const ProductDetail = () =>
{
  const dispatch = useDispatch();

  const { id } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((product) => product.id === id);

  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((favProduct) => favProduct.id === id);

  if (!id) {
    return <div>No product ID provided.</div>;
  }

  if (!product) {
    return <div>No product provided.</div>;
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const newFavoriteCount = favorites.length;
  dispatch(setFavoriteCount(newFavoriteCount));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Product Image */}
          <img src={product.images[0]} alt={product.title} style={{ width: '50%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Product Details */}
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {product.description}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
          <Button style={{ backgroundColor: 'white', color: 'black', marginTop: '-35px' }}>
            {isFavorite ? (
            <FavoriteIcon style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }}
              className="heartIcon"
              onClick={handleToggleFavorite} />
            ) : (
              <FavoriteBorderIcon style={{ position: 'absolute', top: '5px', right: '5px' }}
              className='heartIcon'
              onClick={handleToggleFavorite} />
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
