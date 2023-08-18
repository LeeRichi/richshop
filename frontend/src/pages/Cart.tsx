import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import {Product} from '../components/Home';


function Cart({ cartItems, setCartItems }: { cartItems: any[],  setCartItems: React.Dispatch<React.SetStateAction<Product[]>> })
{
    const removeFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
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
      )}
    </Container>
  );
}

export default Cart;
