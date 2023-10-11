import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Product } from '../interface/ProductInterface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectFavorites, setFavoriteCount } from '../features/favorite/favoriteSlice';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './index.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    if (product.id) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
  };
  
  const newFavoriteCount = favorites.length;
  dispatch(setFavoriteCount(newFavoriteCount));

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Link to={`/product/${product.id}`}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="subtitle1">{`$${product.price}`}</Typography>
          <Typography>{product.description}</Typography>
        </CardContent>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '10px', right: '10px' }}>
          <Button className="buttonContainer" endIcon={<ArrowForwardIcon />}>
          </Button>
        </div>
      </Link>
      <CardActions>
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '100' }}>
          {isFavorite ? (
            <FavoriteIcon
              className="heartIcon"
              style={{color: 'red'}}
              onClick={(e) => {
                handleToggleFavorite(e);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              className="heartIcon"
              onClick={(e) => {
                handleToggleFavorite(e);
              }}
            />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
