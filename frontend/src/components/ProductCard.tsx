import React, { useRef, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Product } from '../interface/ProductInterface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
// import { addToFavorites, removeFromFavorites, selectFavorites, setFavoriteCount } from '../features/favorite/favoriteSlice';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './index.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CartItemInterface } from '../interface/CartItemInterface';
import { OrderInterface } from '../interface/OrderInterface';
import { RootState } from '../app/rootReducer';
import { FavoriteInterface } from '../interface/FavoriteInterface';
import { addToFavorites, removeFromFavorites } from '../utils/api/FavoriteApi';
import { updateUserDetails } from '../features/user/userSlice'; 
import UserInterface from '../interface/UserInterface';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.userDetails?.favorites)
  const user = useSelector((state: RootState) => state.user.userDetails)
  const userId = user?.id;
  const isFavorite = favorites?.some((favProduct: FavoriteInterface) => {
    return product && favProduct.productId === product.id;
  });

  const handleToggleFavorite = (productId: string | undefined) => {
    if (product?.id) {
      const favoriteData = { userId, productId }
      if (isFavorite) {
        removeFromFavorites(favoriteData).then((updatedUserDetails: FavoriteInterface) =>
        {          
          const updatedFavorites = user?.favorites?.filter(
            (favorite: FavoriteInterface) => favorite.productId !== updatedUserDetails.productId
          );
          console.log(updatedFavorites)
          const updatedUser: UserInterface= {
            ...(user as UserInterface), 
            favorites: updatedFavorites,
          };
          console.log(updatedUser)
          dispatch(updateUserDetails(updatedUser));
        })
        .catch((error) => {
          console.error('Failed to remove from favorites:', error);
        });
      } else {
        addToFavorites(favoriteData).then((updatedUserDetails: FavoriteInterface) =>
        {
          if (user?.favorites) {
            const updatedFavorites = [...user.favorites, updatedUserDetails];
            const updatedUser = {
              ...user,
              favorites: updatedFavorites,
            };
            console.log(updatedUser)
            dispatch(updateUserDetails(updatedUser));
          } else {
            console.error('User favorites is undefined');
          }
        })
        .catch((error) => {
          console.error('Failed to add from favorites:', error);
        });
      }
    }
  };
  
  // const newFavoriteCount = favorites.length;
  // dispatch(setFavoriteCount(newFavoriteCount));

    // Ref to store the initial position of the drag
  const dragStartRef = useRef(0);
  
  // State to track the current drag position
  const [dragPosition, setDragPosition] = useState(0);

  const handleDragStart = (e: React.DragEvent) => {
    dragStartRef.current = e.clientX;
  };

  const handleDrag = (e: React.DragEvent) => {
    // Calculate the drag distance
    const dragDistance = e.clientX - dragStartRef.current;

    // Update the drag position
    setDragPosition(dragDistance);
  };

  const handleDragEnd = () => {
    // Reset the drag position on drag end
    setDragPosition(0);
  };
  return (
    <Card
      style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" style={{color: 'black'}}>{product?.title}</Typography>
          <Typography style={{ color: 'grey', textDecoration: 'none' }}>
            {product?.description}
          </Typography>
          <Typography variant="subtitle1" style={{ color: 'black', textDecoration: 'none' }}>
            {`$${product?.price}`}
          </Typography>          
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
                e.stopPropagation(); 
                handleToggleFavorite(product.id);
              }}
            />
          ) : (
            <FavoriteBorderIcon
              className="heartIcon"
                onClick={(e) => {
                e.stopPropagation(); 
                  handleToggleFavorite(product.id);
              }}
            />
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
