import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RootState from '../../app/store';

interface UserDetails {
  id: string;
  name: string;
  address: string;
  email: string;
  avatar: string;
  orders: any[];
  role: string;
}

interface UserState {
  userDetails: UserDetails | null;
}

const initialState: UserState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { updateUserDetails } = userSlice.actions;

export const selectUserDetails = (state: UserDetails) => state.user.userDetails;

export default userSlice.reducer;
