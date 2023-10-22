import React,{useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, setCartCount, clearCart } from '../features/cart/cartSlice';
import { selectUserDetails } from '../features/user/userSlice';
import { Button, Grid, Typography, TextField } from '@mui/material';
import CartItem from '../components/CartItem';
import Category from '../components/Category';
import { Product } from '../interface/ProductInterface';
import { postOrder } from '../utils/api/OrderApi';

const calculateSubtotal = (cartItems: Product[]) => {
  return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
};

const calculateOrderTotal = (cartItems: Product[]) => {
  const subtotal = calculateSubtotal(cartItems);
  const shipping = 0;
  return subtotal + shipping;
};

const Cart = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectUserDetails)?.id
  const cartItems = useSelector(selectCartItems);

  const subtotal = calculateSubtotal(cartItems);
  const orderTotal = calculateOrderTotal(cartItems);
    
  const handlePromotionButton = () =>
  {
    alert('Promotion code not found')
  }

  const onHandleCheckOut = useCallback(async () => {
    try {
      const orderProducts = cartItems.map((item) => ({
        productId: item.id || '',  
        amount: item.quantity || 1,
      }));

      const orderData = {
        orderStatus: 'Pending',
        orderProducts,
        userId: id || '', 
      };

      await postOrder(orderData);

      dispatch(setCartCount(0));
      dispatch(clearCart());

      // Provide any additional actions you want after successful checkout
      // e.g., redirect to a confirmation page
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle any errors during checkout
    }
  }, [cartItems, dispatch]);

  return (
    <>
      <Category />
      <div style={{ padding: '20px', marginLeft: '10rem', display: 'flex', }}>
        <div style={{ width: '60%' }}>
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
        <div style={{marginLeft: '50px', padding: '10px', width: '60%', }}>
          <Grid container spacing={2}>
            <Grid
                item
                xs={12}
                style={{
                    height: '200px',
                    margin: '20px 0',
                    // border: '1px solid rgba(0, 0, 0, 0.1)',
                    // borderRadius: '8px',
                    // padding: '16px',
                    // background: 'rgba(200, 200, 200, 0.1)',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                >
                <Typography variant="h4">Summary</Typography>
                <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
                {/* <Typography variant="body1">Shipping: $10.00</Typography> */}
                <Typography variant="h5">Order Total: ${orderTotal.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" onClick={onHandleCheckOut}>
                    Checkout
                </Button>
            </Grid>
            <Grid
                item xs={12}
                style={{
                    height: '150px',
                    margin: '20px 0',
                    // border: '1px solid rgba(0, 0, 0, 0.1)',
                    // borderRadius: '8px',
                    // padding: '16px',
                    // background: 'rgba(200, 200, 200, 0.1)',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}>
              <Typography variant="h4">Promotion Code</Typography>
              <TextField
                label="Enter code"
                variant="outlined"
                sx={{ mr: '10px', '& input': { height: 10 } }}
              />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePromotionButton}
                    style={{
                        height: '42px',
                        backgroundColor: 'transparent',
                        color: 'rgba(33, 150, 243, 1)',  
                        border: '1px solid rgba(33, 150, 243, 1)', 
                                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(33, 150, 243, 1)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(33, 150, 243, 1)';
                        }}
                >
                Apply
                </Button>
            </Grid>
            <Grid
            item
            xs={12}
            style={{
                height: '150px',
                margin: '20px 0',
            }}>
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
