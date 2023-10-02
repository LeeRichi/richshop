import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserDetails from '../../interface/UserDetails';

const initialState: UserDetails = {
    id: '',
    name: '',
    address: '',
    email: '',
    avatar: '',
    orders: [],
    role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
});

export const {   } = userSlice.actions;
export const selectUserDetails = (state: { user: UserDetails }): UserDetails => state.user;

export default userSlice.reducer;
