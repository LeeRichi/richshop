import React from 'react'
import {
  Typography,
  IconButton,
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