import React, { useEffect, useState } from 'react';
import { getToken } from '../tokenStorage';
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
import { BASE_API_URL } from '../constants';
import getUserDetails from '../utils/getUserDetails';

const Dashboard = () => {
  const token: string | null | undefined = getToken();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () =>
    {
        if (token) {
            try {
                const userDetails = await getUserDetails(token);
                setUserDetails(userDetails);
                console.log(userDetails)
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };
      
      fetchUserDetails();
  }, [token])

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {userDetails ? (
            <>
              {/* Rest of the code to display user details based on userDetails */}
              <Typography variant="h4" align="center" gutterBottom>
                Hi, {userDetails}, welcome back!
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                {/* Email: {userDetails.email} */}
              </Typography>
              {/* ... Other user details ... */}
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
