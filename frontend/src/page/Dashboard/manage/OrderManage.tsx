import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';import { Delete, Edit } from '@mui/icons-material';

import ManageBar from '../../../components/ManageBar'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders, editOrder } from '../../../utils/api/OrderApi';
import { setAllOrders } from '../../../features/order/orderSlice';
import { RootState } from '../../../app/rootReducer';
import OrderProductsInterface from '../../../interface/OrderProductsInterface';
import OrderInterface from '../../../interface/OrderInterface';

const orderStatusOptions = ['Pending', 'Shipped', 'Arrived', 'PickedUp'];

const OrderManage = () =>
{
    const dispatch = useDispatch();
    const [orderProducts, setOrderProducts] = useState<OrderProductsInterface[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
    const [currentOrderId, setCurrentOrderId] = useState<undefined | string>("");

    useEffect(() => {
        fetchOrders()
            .then(orders =>
            {
                dispatch(setAllOrders(orders));
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [dispatch]);
     
    const orders = useSelector((state: RootState) => state.order.orders);

    const openDialog = (orderStatus: string, orderId: string | undefined) => {
        setUpdatedOrderStatus(orderStatus);
        setCurrentOrderId(orderId);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setUpdatedOrderStatus("");
        setCurrentOrderId("");
    };

    const handleUpdateOrderStatus = () => {
        if (currentOrderId && updatedOrderStatus) {
            const orderToUpdate = orders?.find((order) => order.id === currentOrderId);
            
            if (orderToUpdate) {
            const updatedOrderData: OrderInterface = {
                ...orderToUpdate,
                orderStatus: updatedOrderStatus,
            };

            editOrder(currentOrderId, updatedOrderData)
                .then((response) => {
                const updatedOrders = orders?.map((order) => {
                    if (order.id === currentOrderId) {
                    return { ...order, ...response };
                    } else {
                    return order;
                    }
                }) || [];

                dispatch(setAllOrders(updatedOrders));

                closeDialog();
                })
                .catch((error) => {
                console.error('Error updating order status:', error);
                });
            }
        }
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
                    <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order: OrderInterface) => (
                    <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.orderStatus}</TableCell>
                        <TableCell>{order.userId}</TableCell>
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
                    <FormControl fullWidth style={{marginTop:'10px'}}>
                        <InputLabel>Select Order Status</InputLabel>
                        <Select
                        value={updatedOrderStatus}
                        onChange={(e) => setUpdatedOrderStatus(e.target.value as string)}
                        label="Select Order Status"
                        >
                        {orderStatusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateOrderStatus} color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    </>
  )
}

export default OrderManage