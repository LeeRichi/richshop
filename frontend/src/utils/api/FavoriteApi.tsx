import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { getToken } from '../tokenStorage';
import UserInterface from '../../interface/UserInterface';
import { FavoriteInterface } from '../../interface/FavoriteInterface';

export const addToFavorites = (favoriteData: FavoriteInterface) =>
{
  const token = getToken();
  console.log("added")
  return axios.post(`${BASE_API_URL}/users/add-favorite`, favoriteData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
          console.log("Response data:", response.data);
          return response.data;
    })
    .catch(error =>
    {
      console.error(`Error checking user with ${favoriteData}:`, error);
      throw error;
    });
}

export const removeFromFavorites = (favoriteData: FavoriteInterface) =>
{
  const token = getToken();
  console.log('removed')
  return axios.post(`${BASE_API_URL}/users/remove-favorite`, favoriteData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
          console.log("Response data:", response.data);
          return response.data;
    })
    .catch(error =>
    {
      console.error(`Error checking user with ${favoriteData}:`, error);
      throw error;
    });
}