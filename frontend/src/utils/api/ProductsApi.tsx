import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { Product } from '../../interface/ProductInterface';
import { getToken } from '../tokenStorage';

const token = getToken()
console.log(token)

export const postProduct = async (product: Product) =>
{
    try {
        const response = await axios.post(`${BASE_API_URL}/products`, product);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const editProduct = async (productId: string, updatedProductData: Partial<Product>) => {
  const response = await axios.put(`${BASE_API_URL}/products/${productId}`, updatedProductData);
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  return response.data;
};
