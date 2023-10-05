import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { Product } from '../../interface/ProductInterface';
import { getToken } from '../tokenStorage';
import UserInterface from '../../interface/UserInterface';

const token = getToken();


export const fetchUsers = () => {
  return axios.get(`${BASE_API_URL}/users`, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching users:', error);
      throw error;
    });
};

export const postUser = (userData: UserInterface) => {
  // const token = getToken();
  console.log(userData)
  return axios.post(`${BASE_API_URL}/users`, userData, {
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

export const editUser = (userId: string, updatedUserData: UserInterface) => {
  const token = getToken();
  return axios.patch(`${BASE_API_URL}/users/${userId}`, updatedUserData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error editing user with ID ${userId}:`, error);
      throw error;
    });
};

export const deleteUser = (userId: string) =>
{
  const token = getToken();
  return axios.delete(`${BASE_API_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    });
};
