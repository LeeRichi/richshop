import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Order {
  id: string;
  orderStatus: string;
  userId: string;
  orderProducts: OrderProduct[];
}

interface OrderProduct {
  orderId: string;
  productId: string;
  amount: number;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://fullstackshop.azurewebsites.net/api/v1/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrderProducts = async () => {
    try {
      const response = await axios.get('https://fullstackshop.azurewebsites.net/api/v1/orderproducts');
      setOrderProducts(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  const getProductInfoForOrder = (orderId: string) => {
    const productsForOrder = orderProducts.filter(product => product.orderId === orderId);
    return productsForOrder.map(product => `${product.productId} (${product.amount})`).join('\n');
  };

  const deleteOrder = async (orderId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      try {
        await axios.delete(`https://fullstackshop.azurewebsites.net/api/v1/orders/${orderId}`);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

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

  const updateOrder = async () => {
    try {
      await axios.patch(`https://fullstackshop.azurewebsites.net/api/v1/orders/${currentOrderId}`, {
        orderStatus: updatedOrderStatus
      });
      closeDialog(); // Close the dialog
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
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
  );
}

export default Orders;

