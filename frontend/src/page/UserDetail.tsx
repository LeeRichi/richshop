import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography, Box, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Paper } from "@mui/material";
import { RootState } from '../app/rootReducer';

const UserDetail = () => {
    const { id } = useParams();
    const users = useSelector((state: RootState) => state.allUser.users);
    const user = users?.find((user) => user.id === id);

    if (!user) {
        return <Typography variant="body1" align="center">User not found.</Typography>;
    }

    // Sample order history, replace with actual order data
    const orderHistory = [
        { id: 1, date: '2023-10-15', total: 120.5 },
        { id: 2, date: '2023-10-18', total: 180.0 },
        // Add more orders as needed
    ];

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
                    alignItems: 'center',  // Align items in the center (vertically)
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

            {/* Content */}
            <Box flex={1} padding={2}>
                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6">Order History</Typography>
                    <List>
                        {orderHistory.map(order => (
                            <React.Fragment key={order.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>{order.id}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`Order ${order.id}`} secondary={`Date: ${order.date}, Total: $${order.total}`} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>

                <Paper style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h6">Order History Chart</Typography>
                    {/* Add your chart component here */}
                </Paper>
            </Box>
        </Box>
    );
}

export default UserDetail;
