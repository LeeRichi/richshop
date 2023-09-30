import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, setCartCount } from '../features/cart/cartSlice';
import { Button, Grid, Typography, TextField } from '@mui/material';
import CartItem from '../components/CartItem';
import Category from '../components/Category';
import { Product } from '../interface/ProductInterface';

const calculateSubtotal = (cartItems: Product[]) => {
  return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
};

const calculateOrderTotal = (cartItems: Product[]) => {
  const subtotal = calculateSubtotal(cartItems);
  const shipping = 10;
  return subtotal + shipping;
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const subtotal = calculateSubtotal(cartItems);
  const orderTotal = calculateOrderTotal(cartItems);

  return (
    <>
      <Category />
      <div style={{ padding: '20px', marginLeft: '20rem', display: 'flex', marginRight: '20rem'}}>
        <div style={{border: '1px solid black', width: '80%'}}>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
                ) : (
                <div style={{ }}>
                    {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
        <div style={{ border: '1px solid black', marginLeft: '10px', padding: '10px', width: '40%', }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Summary</Typography>
              <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">Shipping: $10.00</Typography>
              <Typography variant="h5">Order Total: ${orderTotal.toFixed(2)}</Typography>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Promotion Code</Typography>
              <TextField label="Enter code" variant="outlined" style={{ marginRight: '10px' }} />
              <Button variant="contained" color="primary">
                Apply
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Payment Methods</Typography>
              <Typography variant="body1">We accept Visa and Mastercard.</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Cart;
