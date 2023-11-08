import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { Product } from '../../interface/ProductInterface';
import { getToken } from '../tokenStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from '../../features/product/productSlice';


const token = getToken()

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const postProduct = (product: Product) =>
{
  const token = getToken();
  console.log(product)
  return axios.post(`${BASE_API_URL}/products`, product, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error posting user:', error);
      throw error;
    });
};

export const editProduct = async (productId: string, updatedProductData: Partial<Product>) =>
{
  const token = getToken();
  try {
    const response = await axios.patch(`${BASE_API_URL}/products/${productId}`, updatedProductData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
};

export const deleteProduct = async (productId: string) => {
  const response = await axios.delete(`${BASE_API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  return response.data;
};
