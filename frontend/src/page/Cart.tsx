import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, setCartCount, clearCart } from '../features/cart/cartSlice';
import { selectUserDetails, updateUserDetails } from '../features/user/userSlice';
import { Button, Grid, Typography, TextField } from '@mui/material';
import CartItem from '../components/CartItem';
import Category from '../components/Category';
import { Product } from '../interface/ProductInterface';
import { postOrder } from '../utils/api/OrderApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../app/rootReducer';
import getUserDetails from '../utils/api/getUserDetails';
import { getToken } from '../utils/tokenStorage';
import { CartItemInterface } from '../interface/CartItemInterface';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectUserDetails)?.id;
  const token = getToken();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(token);
        dispatch(updateUserDetails(userDetails));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [token, dispatch]);

  const cartItems = useSelector((state: RootState) => state.user.userDetails?.carts);
  console.log(cartItems)

  const handlePromotionButton = () => {
    alert('Promotion code not found');
  };

  const onHandleCheckOut = async () => {
    if (cartItems?.length === 0) {
      toast.error("Your cart is still empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    try {
        const orderProducts = (cartItems || []).map((item: CartItemInterface) => ({
        productId: item.productId || '',
        amount: item.quantity || 1,
      }));

      const orderData = {
        orderStatus: 'Pending',
        orderProducts,
        userId: id || '',
      };

      // await postOrder(orderData);
      console.log(orderData);

      dispatch(setCartCount(0));
      dispatch(clearCart());
      navigate('/checkOut');
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  };

  return (
    <>
      <Category />
      <ToastContainer />
      <div style={{ padding: '20px', marginLeft: '10rem', display: 'flex' }}>
        <div style={{ width: '60%' }}>
          {cartItems?.length === 0 ? (
            <>
              <p>Your cart is empty.</p>
              <Button variant="outlined" color="primary" onClick={() => { navigate('/') }}>
                Go to Shop
              </Button>
            </>
          ) : (
            <div style={{}}>
              {cartItems?.map((item: CartItemInterface ) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>
        <div style={{ marginLeft: '50px', padding: '10px', width: '60%' }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                height: '200px',
                margin: '20px 0',
              }}
            >
              <Typography variant="h4">Summary</Typography>
              {/* <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography variant="h5">Order Total: ${orderTotal.toFixed(2)}</Typography>
              <Button variant="contained" color="primary" onClick={onHandleCheckOut}>
                Checkout
              </Button> */}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                height: '150px',
                margin: '20px 0',
              }}
            >
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
              }}
            >
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
