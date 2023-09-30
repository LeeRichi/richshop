import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import { Button } from '@mui/material';
import CartItem from '../components/CartItem'; // You would need to create this component
import Category from '../components/Category';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);

    return (
        <>
            <Category />
            <div style={{ padding: '20px', marginLeft: '20rem' }}>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div style={{width: '40%'}}>
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <Button variant="contained" color="primary">
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
        </>
      
  );
};

export default Cart;
