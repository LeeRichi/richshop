import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { IoMdHand } from 'react-icons/io';

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface Order {
  id: string;
  orderStatus: string;
  createAt: string;
}

interface OrderProduct {
  orderId: string;
  productId: string;
  title: string;
  amount: number;
}

interface DashboardProps {
  name: string;
  avatar: string;
  role: string;
  userId: string;
  isLoggedIn: boolean; // Add the isLoggedIn prop
  setisLoggedIn: (value: boolean) => void; // Add the setisLoggedIn prop
}

export const Dashboard: React.FC<DashboardProps> = ({ name, avatar, role, userId, isLoggedIn, setisLoggedIn }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedAvatar, setEditedAvatar] = useState('');
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  console.log(userId)

  useEffect(() =>
  {
    console.log(userId)
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (userId: any) =>
  {
    try {
      console.log(`userId: ${userId}`)
      const response = await axios.get(`https://fullstackshop.azurewebsites.net/api/v1/users/${userId}`);
      setUserDetails(response.data);
      console.log(userDetails)
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    console.log(userDetails); // This will log the updated userDetails
  }, [userDetails])

  const authToken = localStorage.getItem("authToken");
  // console.log(authToken)

  const handleUpdateProfile = async () =>
  {
    try {
      const updatedData = {
        name: editedName,
        address: editedAddress,
        avatar: editedAvatar,
      };
      
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      };

      const response = await axios.patch(
        `https://fullstackshop.azurewebsites.net/api/v1/users/${userId}`,
        updatedData,
        { headers }
      );      

      if (response.status === 200) {
        fetchUserDetails(userId);
        setIsEditDialogOpen(false);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleViewAllOrders = async () => {
    try {
      const ordersResponse = await axios.get(`https://fullstackshop.azurewebsites.net/api/v1/orders?userId=${userId}`);
      const fetchedUserOrders: Order[] = ordersResponse.data;
      setUserOrders(fetchedUserOrders);
      console.log(userOrders);

      const orderIds = fetchedUserOrders.map(order => order.id);
      console.log(orderIds)
      const orderProductsResponse = await axios.get(
        `https://fullstackshop.azurewebsites.net/api/v1/orderProducts?orderIds=${orderIds.join(",")}`
      );
      const fetchedOrderProducts: OrderProduct[] = orderProductsResponse.data;
      setOrderProducts(fetchedOrderProducts);
      
      console.log(orderProducts);
      setIsOrdersDialogOpen(true);
    } catch (error) {
      console.error("Error fetching orders and order products:", error);
    }
  };

   const closeViewOrdersDialog = () => {
    setIsOrdersDialogOpen(false);
   };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("id");
    localStorage.removeItem("setUserDetails");

    setisLoggedIn(false);
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      {userDetails != null ? ( <>
        {userDetails.role === 'Admin' ? (
          <>
            <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: "3rem" }}>
              <IoMdHand /> Hi, <img src={userDetails.avatar} alt={`avatar`} width="50" style={{ verticalAlign: 'middle' }} />
              {userDetails.name}, what are you thinking?
            </Typography>
            <IconButton
              color="primary"
              sx={{ borderRadius: 8, marginBottom: "1rem" }}
              component={Link} to="/products"
            >
              <EditIcon fontSize="large" />
              <Typography variant="h5" align="center" gutterBottom>
                Manage Products
              </Typography>
            </IconButton><br />
            <IconButton
              color="primary"
              sx={{ borderRadius: 8, marginBottom: "1rem" }}
              component={Link} to="/users"
            >
              <PersonIcon fontSize="large" />
              <Typography variant="h5" align="center" gutterBottom>
                Manage Users
              </Typography>
            </IconButton><br />
            <IconButton
              color="primary"
              sx={{ borderRadius: 8, marginBottom: "1rem" }}
              component={Link} to="/orders"
            >
              <ShoppingBasketIcon fontSize="large" />
              <Typography variant="h5" align="center" gutterBottom>
                Manage Orders
              </Typography>
            </IconButton>
          </>
        ) : (
          <Typography variant="h4" align="center" gutterBottom sx={{marginBottom: "3rem"}}>
            Hi, <img src={userDetails.avatar} alt={`avatar`} width="50" style={{ verticalAlign: 'middle' }} />{userDetails.name}, welcome back!
          </Typography>
        )}
 
        {userDetails.role === 'User' && userDetails && (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              Your UserID: {userDetails.id}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Name: {userDetails.name}
            </Typography>
            <img src={userDetails.avatar} alt={`avatar`} width="100" style={{ cursor: 'pointer' }} />
            <Typography variant="body1" align="center" gutterBottom>
              Address: {userDetails.address}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Email: {userDetails.email}
            </Typography>
            
            <Button variant="contained" color="primary" onClick={()=>setIsEditDialogOpen(true)} sx={{ marginTop: '1rem' }}>
              Update My Profile
            </Button>
            <Button variant="contained" color="secondary" onClick={handleViewAllOrders} sx={{ marginTop: '1rem' }}>
              View My Orders
            </Button>
            <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  fullWidth
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Address"
                  fullWidth
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Avatar URL"
                  fullWidth
                  value={editedAvatar}
                  onChange={(e) => setEditedAvatar(e.target.value)}
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={isOrdersDialogOpen} onClose={closeViewOrdersDialog}>
              <DialogTitle>Your Orders</DialogTitle>
              <DialogContent>
                <List>
                  {userOrders.map((order) => (
                    <ListItem key={order.id}>
                      <ListItemText
                        primary={`Order ID: ${order.id}`}
                        secondary={
                          <>
                            <div>Order Status: {order.orderStatus}</div>
                            <div>Order Date: {order.createAt}</div>
                            <div>Order Products:</div>
                            <ul>
                              {orderProducts
                                .filter(product => product.orderId === order.id)
                                .map(product => (
                                  <li key={product.productId}>
                                    {product.productId} - Quantity: {product.amount}
                                  </li>
                                ))}
                            </ul>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeViewOrdersDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        {isLoggedIn && (
          <IconButton
            onClick={handleLogout}
            color="primary"
            sx={{ marginTop: '1rem' }}
          >
            <ExitToAppIcon />
            <Typography variant="button">Log Out</Typography>
          </IconButton>
        )}
      </>
      ) : ( <Typography>Loading...</Typography>)}
    </Container>
  );
};

export default Dashboard;

