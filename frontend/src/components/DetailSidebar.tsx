import React from 'react'
import { Box, Avatar, Typography, Button, IconButton, } from '@mui/material'
import UserInterface from '../interface/UserInterface'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const DetailSidebar = ({ user }: { user: UserInterface }) => 
{
  return (
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
          
        {user.role === 'Admin' && (
            <Box marginTop="50px" display="flex" flexDirection="column" gap="20px">
                <Button variant="contained" color="primary" >
                    Manage Products
                </Button>
                <Button variant="contained" color="primary">
                    Manage Users
                </Button>
                <Button variant="contained" color="primary">
                    Manage Orders
                </Button>
            </Box>
        )}
    </Box>
  )
}

export default DetailSidebar