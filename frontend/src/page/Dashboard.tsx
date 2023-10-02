import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/tokenStorage';
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
} from "@mui/material";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { IoMdHand } from 'react-icons/io';
import { BASE_API_URL } from '../utils/constants';
import getUserDetails from '../utils/getUserDetails';
import UserDetails from '../interface/UserDetails';

const Dashboard = () => {
  const token: string | null | undefined = getToken();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const userDetails = await getUserDetails(token);
          setUserDetails(userDetails);
          console.log(userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {userDetails && userDetails.role === 'Admin' ? (
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
          ) : userDetails && userDetails.role === 'User' ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Hi, {userDetails.name}, welcome back!
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
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
            </>
          ) : (
            <Typography>User details not available.</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
