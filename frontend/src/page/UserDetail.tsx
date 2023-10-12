import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography, Box, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Paper } from "@mui/material";
import { RootState } from '../app/rootReducer';
import { fetchOrderProduct } from '../utils/api/OrderApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProducts } from '../features/order/orderProductSlice';
import { Product } from '../interface/ProductInterface';
import ProductCard from '../components/ProductCard';

interface MatchedProduct {
  amount: number;
  orderProductId: string;
  product: Product;
  orderId?: string;
}

interface OrderTotalPrice {
  productId: string;
  orderId: string;
  total: number;
}

const UserDetail = () =>
{
    const dispatch = useDispatch();
    const { id } = useParams();
    const users = useSelector((state: RootState) => state.allUser.users);
    const user = users?.find((user) => user.id === id);
    const orders = useSelector((state: RootState) => state.order.orders)
    const userOrders = orders?.filter(order => order.userId === id);
    const products = useSelector((state: RootState) => state.products.products);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const cart = useSelector((state: RootState) => state.cart.cartItems);

    useEffect(() => {
        fetchOrderProduct().then(products => {
            dispatch(setOrderProducts(products));
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [dispatch]);

    const orderProducts = useSelector((state: RootState) => state.orderProduct.orderProducts)

    const matchedProducts: (MatchedProduct | null)[] = orderProducts.map(orderProduct => {
        const matchingProduct = products.find(product => product.id === orderProduct.productId);

        if (matchingProduct) {
            return {
                orderProductId: orderProduct.productId,
                product: matchingProduct,
                amount: orderProduct.amount,
                orderId: orderProduct.orderId,
            };
        }
        return null;
    });

    const orderTotalPrices: OrderTotalPrice[] = matchedProducts
        .filter((matchedProduct) => matchedProduct !== null)
        .map(({ amount, product, orderId }: any) => ({
            orderId: orderId || '',
            productId: product?.id || '',
            total: (amount || 0) * (product?.price || 0),
    }));

    if (!user) {
        return <Typography variant="body1" align="center">User not found.</Typography>;
    }

    // const handleShowMoreFavorites = () => {
    //     history.push('/favorites');
    // };

    return (
        <Box display="flex">
            <Box
                width={300}
                padding={2}
                style={{
                    borderRight: '1px solid #ccc',
                    minHeight: '100vh',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar alt={user.name} src={user.avatar} style={{ width: '150px', height: '150px', margin: '10px 0' }} />
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body1">User ID: {user.id}</Typography>
                <Typography variant="body1">Name: {user.name}</Typography>
                <Typography variant="body1">Address: {user.address}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>

                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <Button variant="contained" color="primary">Edit</Button>
                    <Button variant="contained" color="secondary">Log Out</Button>
                </div>
            </Box>
            <Box flex={1} padding={2}>
                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6">Order History</Typography>
                    <List>
                        {userOrders?.map((order) => {
                            const total = orderTotalPrices.find(
                                (item) => item.orderId === order.id
                            );
                            return (
                            <React.Fragment key={order.id}>
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>{order.id}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Order ${order.id}`}
                                    secondary={`Date: ${order.updatedAt}, Total: $${
                                    total ? total.total : 0
                                    }`}
                                />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                            );
                        })}
                    </List>
                </Paper>
                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6">Your Favorites</Typography>
                    <Grid container spacing={2}>
                        {favorites.slice(0, 4).map((product: any) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.5}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                    {favorites.length > 4 && (
                        <Link to="/favorites">
                            <Button variant="outlined" color="primary">
                                Show more
                            </Button>
                        </Link>
                    )}
                </Paper>
                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6">Cart</Typography>
                    <Grid container spacing={2}>
                        {cart.map((product: any) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.5}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        </Box>
    );
}

export default UserDetail;
