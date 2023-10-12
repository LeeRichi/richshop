import React from 'react'
import {
  Typography,
  IconButton,
  Box,
  Avatar,
  Button
} from "@mui/material";
import { IoMdHand } from 'react-icons/io';
import UserDetails from '../../interface/UserInterface';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface DashboardAdminProps {
  userDetails: UserDetails;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ userDetails }) => {
  return (
    <>
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
            <Avatar alt={userDetails.name} src={userDetails.avatar} style={{ width: '150px', height: '150px', margin: '10px 0' }} />
            <Typography variant="h6">{userDetails.name}</Typography>
            <Typography variant="body1">User ID: {userDetails.id}</Typography>
            <Typography variant="body1">Name: {userDetails.name}</Typography>
            <Typography variant="body1">Address: {userDetails.address}</Typography>
            <Typography variant="body1">Email: {userDetails.email}</Typography>

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="secondary">Log Out</Button>
            </div>
        </Box>
        
      </Box>

      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: "3rem" }}>
          <IoMdHand /> Hi, <img src={userDetails.avatar} alt={`avatar`} width="50" style={{ verticalAlign: 'middle',  borderRadius: '50%' }} />
          {userDetails.name}, what are you thinking?
      </Typography>
      <IconButton
          color="primary"
          sx={{ borderRadius: 8, marginBottom: "1rem" }}
          component={Link} to="/manage-products"
      >
          <EditIcon fontSize="large" />
          <Typography variant="h5" align="center" gutterBottom>
          Manage Products
          </Typography>
      </IconButton><br />
      <IconButton
          color="primary"
          sx={{ borderRadius: 8, marginBottom: "1rem" }}
          component={Link} to="/manage-users"
      >
          <PersonIcon fontSize="large" />
          <Typography variant="h5" align="center" gutterBottom>
          Manage Users
          </Typography>
      </IconButton><br />
      <IconButton
          color="primary"
          sx={{ borderRadius: 8, marginBottom: "1rem" }}
          component={Link} to="/manage-orders"
      >
          <ShoppingBasketIcon fontSize="large" />
          <Typography variant="h5" align="center" gutterBottom>
          Manage Orders
          </Typography>
      </IconButton>
    </>
  )
}

export default DashboardAdmin