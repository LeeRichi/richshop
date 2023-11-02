import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography, Box, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Paper } from "@mui/material";
import { RootState } from '../app/rootReducer';
import { fetchOrderProduct, fetchOrders } from '../utils/api/OrderApi';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProducts } from '../features/order/orderProductSlice';
import { Product } from '../interface/ProductInterface';
import ProductCard from '../components/ProductCard';
import DetailSidebar from '../components/DetailSidebar';
import { setAllOrders } from '../features/order/orderSlice';
import ProductManage from './Dashboard/manage/ProductManage';
import OrderManage from './Dashboard/manage/OrderManage';
import UserManage from './Dashboard/manage/UserManage';
import { fetchUsers } from '../utils/api/UsersApi';
import { setAllUsers } from '../features/user/allUserSlice';
import UserInterface from '../interface/UserInterface';
import { OrderInterface } from '../interface/OrderInterface';
import OrderProductsInterface from '../interface/OrderProductsInterface';

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

const UserDetail = ({ appLogout }: { appLogout: () => void }) =>
{
    const dispatch = useDispatch();
    const { id } = useParams();
    const users = useSelector((state: RootState) => state.allUser.users);
    const user = users?.find((user) => user.id === id);

    const orders = useSelector((state: RootState) => state.order.orders)
    const products = useSelector((state: RootState) => state.products.products);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const cart = user?.carts;
    const userOrders: OrderInterface[] = (orders ?? []).filter(order => order.userId === id);
    console.log(userOrders)

    const currentUser = useSelector((state: RootState) => state.user.userDetails);

    const [isProductManageOpen, setIsProductManageOpen] = useState(false);
    const [isUserManageOpen, setIsUserManageOpen] = useState(false);
    const [isOrderManageOpen, setIsOrderManageOpen] = useState(false);
    const [editedUser, setEditedUser] = useState<UserInterface | undefined>(user);

    const updateUser = (updatedUser: UserInterface) => {
        setEditedUser(updatedUser);
    };
    
    // useEffect(() => {
    //     fetchOrderProduct().then(products => {
    //         dispatch(setOrderProducts(products));
    //     }).catch(error => {
    //         console.error('Error fetching order products:', error);
    //     });
    // }, [dispatch]);

    useEffect(() => {
        fetchOrders().then(orders => {
            dispatch(setAllOrders(orders));
        }).catch(error => {
            console.error('Error fetching orders:', error);
        });
    }, [dispatch]);

    useEffect(() => {
        fetchUsers().then(users => {
            dispatch(setAllUsers(users));
        }).catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [dispatch]);

    if (!currentUser) {
        return <Typography variant="body1" align="center">User not found.</Typography>;
    }

    return (
        <Box display="flex">
            <DetailSidebar user={user ?? currentUser} appLogout={appLogout} setIsProductManageOpen={setIsProductManageOpen} setIsUserManageOpen={setIsUserManageOpen} setIsOrderManageOpen={setIsOrderManageOpen} updateUser={updateUser}
            />
            {isProductManageOpen && (
                <ProductManage />
            )}
            {isUserManageOpen && (
                <UserManage />
            )}
            {isOrderManageOpen && (
                <OrderManage />
            )}

            {!isProductManageOpen && !isUserManageOpen && !isOrderManageOpen &&
                (
                    <Box flex={1} padding={2}>
                        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                            <Typography variant="h6">Order History</Typography>
                            <List>
                                {userOrders?.map((order) =>
                                {
                                    // const total = orderTotalPrices.find(
                                    //     (item) => item.orderId === order.id
                                    // );
                                    return (
                                        <React.Fragment key={order.id}>
                                            <Link to={`/orders/${order.id}`} style={{ textDecoration: 'none' }}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                    <Avatar>{order.updatedAt}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={<span style={{ color: 'black' }}>{`Order ${order.id}`}</span>}
                                                        // secondary={`Date: ${order.updatedAt}, Total: $${total ? total.total : 0}`}
                                                    />
                                                </ListItem>
                                            </Link>
                                            <Divider />
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        </Paper>
                        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                            <Typography variant="h6">Favorites</Typography>
                            {favorites.length === 0 ? (
                                <Typography style={{ fontSize: '12px', color: 'grey' }}>
                                Your favorites are still empty.
                                </Typography>
                            ) : (
                                <>
                                <Grid container spacing={2}>
                                    {favorites.slice(0, 4).map((product: any) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.5}>
                                        <ProductCard product={product.product} />
                                    </Grid>
                                    ))}
                                </Grid>
                                {favorites.length > 4 && (
                                    <div style={{ alignSelf: 'flex-end' }}>
                                    <Link to="/favorite">
                                        <Button variant="outlined" color="primary">
                                        See All
                                        </Button>
                                    </Link>
                                    </div>
                                )}
                                </>
                            )}
                        </Paper>
                        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                            <Typography variant="h6">Cart</Typography>
                        {cart?.length === 0 ? (
                            <Typography style={{ fontSize: '12px', color: 'grey' }}>
                                Your favorites are still empty.
                            </Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {cart && cart.length > 0 && (
                                <Grid container spacing={2}>
                                    {cart.map((product: any) => (
                                        <Grid item key={product.userId} xs={12} sm={6} md={4} lg={2.5}>
                                            {/* <ProductCard product={product} /> */}
                                            
                                        </Grid>
                                    ))}
                                </Grid>
                                )}
                            </Grid>
                        )}
                        </Paper>
                    
                        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                            <Typography variant="h6">You might also like</Typography>
                            <Typography style={{ fontSize: '12px', color: 'grey' }}>Upcoming feature</Typography>
                        </Paper>
                    </Box>
                )}
        </Box>
    );
}

export default UserDetail;
