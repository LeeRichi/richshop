import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { getToken } from '../tokenStorage';
import {CartItemInterface} from '../../interface/CartItemInterface';

export const addToCart = (dataProps: CartItemInterface) =>
{
  console.log(dataProps)
  return axios.post(`${BASE_API_URL}/users/add-to-cart`, dataProps,)
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding items to cart:', error);
      throw error;
    });
};