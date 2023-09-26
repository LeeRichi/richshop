import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Product } from '../interface/ProductInterface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectFavorites, setFavoriteCount } from '../features/favorite/favoriteSlice';
import './index.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const newFavoriteCount = favorites.length;
  dispatch(setFavoriteCount(newFavoriteCount));

  return (
    <Card style={{ position: 'relative' }}>
      <CardContent>
        <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {isFavorite ? (
            <FavoriteIcon style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }} className="heartIcon" onClick={(e) => { e.stopPropagation(); handleToggleFavorite(); }} />
          ) : (
            <FavoriteBorderIcon style={{ position: 'absolute', top: '5px', right: '5px' }} className='heartIcon' onClick={(e) => { e.stopPropagation(); handleToggleFavorite(); }} />
          )}
        </div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
        <Typography>{product.description}</Typography>
        <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
          <Button className="buttonContainer" endIcon={<ArrowForwardIcon />}>
            {/* Add to Cart */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
