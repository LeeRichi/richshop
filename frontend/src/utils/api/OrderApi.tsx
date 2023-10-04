import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { getToken } from '../tokenStorage';
import OrderInterface from '../../interface/OrderInterface';

export const fetchOrders = () => {
  return axios.get(`${BASE_API_URL}/orders`)
      .then(response => response.data)
};

export const postOrder = (orderData: OrderInterface) => {
  const token = getToken();
  return axios.post(`${BASE_API_URL}/orders`, orderData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error posting order:', error);
      throw error;
    });
};

export const editOrder = (orderId: string, updatedOrderData: OrderInterface) => {
  const token = getToken();
  return axios.patch(`${BASE_API_URL}/orders/${orderId}`, updatedOrderData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error editing order with ID ${orderId}:`, error);
      throw error;
    });
};

export const deleteOrder = (orderId: string) => {
  const token = getToken();
  return axios.delete(`${BASE_API_URL}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting order with ID ${orderId}:`, error);
      throw error;
    });
};