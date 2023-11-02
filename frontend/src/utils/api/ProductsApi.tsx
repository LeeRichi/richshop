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

export const postProduct = async (product: Product) =>
{
  try {
    const response = await axios.post(`${BASE_API_URL}/products`, product);
    const newProduct = response.data;
    return newProduct;
  } catch (err) {
    console.error(err);
  }
};

export const editProduct = async (productId: string, updatedProductData: Partial<Product>) =>
{
  console.log(updatedProductData)
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
