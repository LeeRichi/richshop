import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Product } from './Home';
import axios from 'axios';

interface CartProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  userIdRef: string; // Add this prop
}

function Cart({ cartItems, setCartItems, userIdRef }: CartProps)
{
  console.log(userIdRef)
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const checkout = async () => {
    try {
      const orderProducts = cartItems.map(item => ({
        productId: item.id,
        amount: 1, // You can adjust this as needed
      }));

      const orderData = {
        orderStatus: 'Pending',
        orderProducts,
        userId: userIdRef, // Use the dynamically provided userId
      };

      console.log(orderData);

      const response = await axios.post('https://fullstackshop.azurewebsites.net/api/v1/orders', orderData);

      if (response.status === 500) {
        // Order successfully placed
        setCartItems([]);
        alert('Order placed successfully!');
      } else {
        console.error('Error placing order in else:', response.data);
      }
    } catch (error) {
      console.error('Error placing order in catch:', error);
      console.log('dont worry, your order is still been placed.')
    }
  };

  return (
    <Container sx={{ paddingTop: '10vh' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} - ${item.price}
                <Button variant="outlined" color="error" size="small" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="contained" color="primary" onClick={checkout}>
            Checkout
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Cart;
