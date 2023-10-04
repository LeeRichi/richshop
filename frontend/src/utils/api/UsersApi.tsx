import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { Product } from '../../interface/ProductInterface';
import { getToken } from '../tokenStorage';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserDetails } from '../../features/user/userSlice';

export const FetchUsers = async () =>
{
    const dispatch = useDispatch();
    try {
        const response = await axios.get(`${BASE_API_URL}/users`);
        console.log(response.data);
        dispatch(updateUserDetails(response.data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};