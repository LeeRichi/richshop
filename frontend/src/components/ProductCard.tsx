import React, {useState} from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Product } from '../interface/ProductInterface'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/favorite/favoriteSlice';
import './index.css';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) =>
{
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleHeartIconClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    event.preventDefault();
    handleToggleFavorite();
  };

  return (
    <Card>
      <CardContent>
        <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {isFavorite ? (
            <FavoriteIcon style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }}
              className="heartIcon"
              onClick={handleHeartIconClick} />
          ) : (
              <FavoriteBorderIcon style={{ position: 'absolute', top: '5px', right: '5px' }}
              className='heartIcon'
              onClick={handleHeartIconClick} />
          )}
        </div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
        <Typography>{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
