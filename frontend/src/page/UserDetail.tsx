import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography, Box, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Paper, useMediaQuery } from "@mui/material";
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
import Favorite from '../page/Favorite';
import OrderHistory from '../page/OrderHistory';
import { openOrderHistory } from '../features/DetailPages/DetailPagesSlice';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import Cart from './Cart';
import DetailSubbar from '../components/DetailSubbar';
import SidebarBtn from '../components/DetailSubbar';

const UserDetail = ({ appLogout }: { appLogout: () => void }) =>
{
    const dispatch = useDispatch();
    const { id } = useParams();
    const isSmallDevice = useMediaQuery('(max-width: 720px)');
    const users = useSelector((state: RootState) => state.allUser.users);
    const user = users?.find((user) => user.id === id);
    const orders = useSelector((state: RootState) => state.order.orders)
    const cart = user?.carts;
    const userOrders: OrderInterface[] = (orders ?? []).filter(order => order.userId === id);
    const userPoints = userOrders.map((order) =>
        order.orderProducts
        .map((product) => product.product.price * product.amount)
        .reduce((total, price) => total + price, 0)
    );    const currentUser = useSelector((state: RootState) => state.user.userDetails);
    const totalSum = userPoints.reduce((total, price) => total + price, 0);

    const isProductManageOpen = useSelector((state: RootState) => state.DetailPages.isProductManageOpen);
    const isUserManageOpen = useSelector((state: RootState) => state.DetailPages.isProductManageOpen);
    const isOrderManageOpen = useSelector((state: RootState) => state.DetailPages.isProductManageOpen);
    const isFavoriteOpen = useSelector((state: RootState) => state.DetailPages.isProductManageOpen);
    const isOrderHistoryOpen = useSelector((state: RootState) => state.DetailPages.isOrderHistoryOpen);
    const isCartOpen = useSelector((state: RootState) => state.DetailPages.isCartOpen);
    
    const [editedUser, setEditedUser] = useState<UserInterface | undefined>(user);

    const updateUser = (updatedUser: UserInterface) => {
        setEditedUser(updatedUser);
    };

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
        <>
            {isSmallDevice ? <SidebarBtn /> : null}
            <Box display="flex">            
                <DetailSidebar user={user ?? currentUser} appLogout={appLogout} updateUser={updateUser}
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
                    {isFavoriteOpen && (
                        <Favorite />
                    )}
                    {isOrderHistoryOpen && (
                        <OrderHistory />
                    )}
                    {isCartOpen && (
                        <Cart />
                    )}

                    {!isProductManageOpen && !isUserManageOpen && !isOrderManageOpen && !isFavoriteOpen && !isOrderHistoryOpen && !isCartOpen &&
                        (
                        <Box flex={1} padding={2}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ flex: 1, marginRight: '10px', borderRadius:'10px', backgroundColor: '#E3E3E3'}}>
                                    <Box display="flex" alignItems="center" style={{                              
                                        margin: '3rem',
                                        borderRadius: '10px',
                                        height: '70%',
                                    }}>                             
                                        <CircularProgressWithLabel value={totalSum} />
                                        <Typography style={{margin: '10px'}}>
                                            Collect € 500 until 29.02.2024 to unlock GOLD status.<br/>
                                            While you’re a GOLD, you benefit from improved raffle chances. Learn more
                                            GO TO LEVEL STATUS
                                        </Typography>
                                    </Box>                          
                                </div>
                                
                                <div style={{ flex: 1, marginRight: '10px' }}></div>
                            </div>
                            <div style={{display: 'flex'}}>
                                
                            </div>
                                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Typography variant="h6">Your Last Order</Typography>
                                        </div>
                                        <div>
                                            <Button onClick={() => dispatch(openOrderHistory())}>View All</Button>
                                        </div>
                                    </div>
                                    <List>
                                        {userOrders?.slice(0, 1).map((order) => {
                                        return (
                                            <React.Fragment key={order.id}>
                                                <Link to={`/orders/${order.id}`} style={{ textDecoration: 'none' }}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={<span style={{ color: 'black' }}>{`Order ${order.updatedAt}`}</span>}
                                                            secondary={`Date: ${order.id}, Total: $${order.orderTotal ? order.orderTotal : 0}`}
                                                        />
                                                        <ListItemAvatar>
                                                            <div style={{ display: 'flex' }}>
                                                                {order.orderProducts.map((product) => (
                                                                    <img
                                                                        key={product.product.id}
                                                                        src={product.product.images[0]}
                                                                        alt={`Product Image for Order ${order.id}`}
                                                                        style={{ width: '128px', height: '100px', margin: '5px' }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </ListItemAvatar>
                                                    </ListItem>
                                                </Link>
                                                <Divider />
                                            </React.Fragment>
                                            );
                                        })}
                                    </List>
                                </Paper>                                          
                                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                                    <Typography variant="h6">You might also like</Typography>
                                    <Typography style={{ fontSize: '12px', color: 'grey' }}>Upcoming feature</Typography>
                                </Paper>
                            </Box>
                        )}
                </Box>
            </>        
        );
}

export default UserDetail;
