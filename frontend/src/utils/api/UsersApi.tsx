import { BASE_API_URL } from '../constants';
import axios from 'axios';
import { Product } from '../../interface/ProductInterface';
import { getToken } from '../tokenStorage';
import { useDispatch, useSelector } from 'react-redux';

import { setAllUsers } from '../../features/user/allUserSlice';

export const FetchUsers = async () =>
{
    const dispatch = useDispatch();
    try {
        const response = await axios.get(`${BASE_API_URL}/users`);
        console.log(response.data);
        dispatch(setAllUsers(response.data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};