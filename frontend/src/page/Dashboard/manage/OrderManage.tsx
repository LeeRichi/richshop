import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import ManageBar from '../../../components/ManageBar'
import { useDispatch, useSelector } from 'react-redux';

const OrderManage = () => {
  return (
    <>
        <ManageBar />
        <Container>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                <TableHead sx={{ backgroundColor: 'darkgray' }}>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Order Products</TableCell>
                    <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                    <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.orderStatus}</TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell
                        sx={{ whiteSpace: 'pre-line' }}
                        >
                        <Tooltip title={getProductInfoForOrder(order.id)}>
                            <span>{getProductInfoForOrder(order.id)}</span>
                        </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                        <Edit color="primary" onClick={() => openDialog(order.orderStatus, order.id)} />
                        <Delete color="error" onClick={() => deleteOrder(order.id)} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                <TextField
                    label="New Order Status"
                    fullWidth
                    value={updatedOrderStatus}
                    onChange={(e) => setUpdatedOrderStatus(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={updateOrder} color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    </>
  )
}

export default OrderManage