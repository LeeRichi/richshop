import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import ManageBar from '../../../components/ManageBar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from '../../../utils/api/OrderApi';
import { setAllOrders } from '../../../features/order/orderSlice';
import { RootState } from '../../../app/rootReducer';
import OrderProductsInterface from '../../../interface/OrderProductsInterface';
import OrderInterface from '../../../interface/OrderInterface';

const OrderManage = () =>
{
    const dispatch = useDispatch();
    const [orderProducts, setOrderProducts] = useState<OrderProductsInterface[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState("");

    useEffect(() => {
        fetchOrders()
            .then(orders => {
            dispatch(setAllOrders(orders));
            })
            .catch(error => {
            console.error('Error fetching users:', error);
            });
    }, [dispatch]);
     
    const orders = useSelector((state: RootState) => state.order.orders);

    const openDialog = (orderStatus: string, orderId: string) => {
        setUpdatedOrderStatus(orderStatus);
        setCurrentOrderId(orderId);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setUpdatedOrderStatus(""); // Reset the order status
        setCurrentOrderId("");
    };

    const onHandleDelete = (orderId?: string) =>
    {
        if (orderId) {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            deleteOrder(orderId);
            if (orders) {
            const deletedOrder = orders?.find((order) => order.id === orderId);
            const updatedOrders = orders?.filter((order) => order.id !== orderId);
            dispatch(setAllOrders(updatedOrders));
            if (deletedOrder) {
                alert(`Order ID:"${deletedOrder?.id}" has been deleted.`);
            }
            }
        }
        }
      };
    
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
                    {orders?.map((order: OrderInterface) => (
                    <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.orderStatus}</TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell
                        sx={{ whiteSpace: 'pre-line' }}
                        >
                        {/* <Tooltip title={getProductInfoForOrder(order.id)}>
                            <span>{getProductInfoForOrder(order.id)}</span>
                        </Tooltip> */}
                        </TableCell>
                        <TableCell align="center">
                        <Edit color="primary" onClick={() => openDialog(order.orderStatus, order.id)} />
                        <Delete color="error" onClick={() => onHandleDelete(order.id)} />
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
                <Button onClick={} color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    </>
  )
}

export default OrderManage