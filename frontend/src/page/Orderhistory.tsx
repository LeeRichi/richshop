import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Box, Card, CardContent, Grid, useMediaQuery } from '@mui/material';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import React from 'react';
import ProductCard from '../components/ProductCard';
import { OrderInterface } from '../interface/OrderInterface';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../interface/ProductInterface';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery('(max-width: 900px)');
  const cardHoverStyles = {
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
  };
  
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.allUser.users);
  const user = users?.find((user) => user.id === id);

  const orders = useSelector((state: RootState) => state.order.orders);
  const userOrders = orders?.filter((order) => order.userId === id);
  
  function formatDateYearMonth(dateString: string | undefined) {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    return `${month} ${year}`;
  }

  return (
    <Box flex={1} padding={2}>
      <h2 style={{ textAlign: isSmallDevice ? 'center' : 'initial' }}>
        Order History
      </h2>
      {userOrders?.length === 0 ? (
          <div style={{margin: '20px'}}>
            <p>Your order History is empty.</p><br/>
              <Button variant="outlined" color="primary" onClick={() => { navigate('/') }}>
                Go to Shop
              </Button>
          </div>
        ): null}
      <Grid container spacing={2}>
        {userOrders?.map((order) => (
          order ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card sx={{ margin: '3rem', ...cardHoverStyles,  }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between'}}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                      <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/orders/${order.id}`)}>
                        <Typography variant="h5" component="div">
                          {formatDateYearMonth(order.updatedAt)}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Order number: {order.id}
                        </Typography>
                        <Typography variant="body2">
                          Total Price: {order.orderTotal}
                          <br />
                          Order date: {order.updatedAt}
                        </Typography>
                        <Typography variant="h5" component="div" style={{ margin: '3rem 0' }}>
                          {order.orderStatus}
                        </Typography>
                        <Button variant="outlined">
                          Track
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                        {order.orderProducts.map((product) => (
                           <div key={product.productId} style={{ textAlign: 'center', cursor: 'pointer'}} onClick={() => navigate(`/product/${product.productId}`)}>
                                <img
                                    src={product.product.images[0]}
                                    alt="Order Image"
                                    style={{ width: 'auto', maxWidth: '200px', minHeight: '230px', margin: '5px', minWidth: '150px', borderRadius: '10px' }}
                                />
                                <Typography>
                                    {product.product.title}
                                </Typography>
                            </div>
                        ))}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ) : null
        ))}
      </Grid>
    </Box>
  );
};

export default OrderHistory;
