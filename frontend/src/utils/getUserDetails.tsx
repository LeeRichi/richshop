import axios from 'axios';
import {BASE_API_URL} from '../constants'
    
const getUserDetails = async (token: string | null | undefined) => {
  if (!token) {
    throw new Error('Token is null or undefined.');
  }

  const userId = JSON.parse(atob(token.split('.')[1])).nameid;
  
  if (!userId) {
    throw new Error('User ID not found in token.');
  }

  try {
    const response = await axios.get(`${BASE_API_URL}/users/${userId}`);
      return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Unable to fetch user details.');
  }
};

export default getUserDetails;
