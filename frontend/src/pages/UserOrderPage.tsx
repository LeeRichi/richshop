import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface Order {
  id: string;
  orderStatus: string;
  orderProducts: OrderProduct[]; // Update the type as needed
  createAt: string;
  updatedAt: string;
  userId: string;
}

interface OrderProduct {
  orderId: string;
  productId: string;
  amount: number;
}

function UserOrderPage() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name');
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);

  const fetchUserOrders = async () => {
    try {
      const ordersResponse = await axios.get(`http://localhost:5052/api/v1/orders/`);
      const orderProductsResponse = await axios.get(`http://localhost:5052/api/v1/orderproducts/`);
      
      const orders = ordersResponse.data.filter((order: Order) => order.userId === userId);
      const orderProducts = orderProductsResponse.data;

      const ordersWithProducts = orders.map((order: Order) => {
        const matchingProducts = orderProducts.filter((product: OrderProduct) => product.orderId === order.id);
        return { ...order, orderProducts: matchingProducts };
      });
      
      setUserOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        {userName}'s Orders
      </Typography>
      <List>
        {userOrders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primaryTypographyProps={{ variant: 'h6' }}
              primary={`Order ID: ${order.id}`}
              secondary={
                <div>
                  <Typography variant="body1">
                    <strong>Order Status:</strong> {order.orderStatus}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Order Products:</strong> {order.orderProducts.map((product) => `${product.amount} x ${product.productId}`).join(', ')}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created At:</strong> {order.createAt}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Updated At:</strong> {order.updatedAt}
                  </Typography>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default UserOrderPage;
