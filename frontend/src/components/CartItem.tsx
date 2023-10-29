import React, { useState, useEffect } from 'react';
import { Product } from '../interface/ProductInterface';
import {CartItemInterface} from '../interface/CartItemInterface';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, setCartCount, selectCartItems } from '../features/cart/cartSlice';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { updateProductQuantity } from '../features/cart/cartSlice';

interface CartItemProps {
  item: CartItemInterface;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [quantity, setQuantity] = useState(item.quantity || 1);
    
  useEffect(() => {
    const totalQuantity = cartItems.reduce((total, cartItem) => total + (cartItem.quantity || 1), 0);
    dispatch(setCartCount(totalQuantity));
  }, [cartItems, dispatch]);
    
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      if (item.productId) {
        dispatch(updateProductQuantity({ productId: item.productId, quantity: newQuantity }));
      }
    }
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', position: 'relative' }}>
      <Grid container>
        <Grid item xs={4}>
          <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={5} style={{ paddingLeft: '10px' }}>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="body2">Price: ${item.price}</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <RemoveIcon />
            </IconButton>
            <input
              type="number"
              value={quantity}
              min={1}
              style={{ width: '40px', textAlign: 'center' }}
              readOnly
            />
            <IconButton onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={3} style={{ position: 'relative', textAlign: 'right' }}>
          <Typography variant="body2">Total: ${item.price * quantity}</Typography>
          <Button onClick={handleDeleteFromCart} style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <DeleteOutlineIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItem;
