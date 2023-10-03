import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserDetails from '../../interface/UserDetails';

interface UserState {
  userDetails: UserDetails | null;
  error: null;
}

const initialState: UserState = {
  userDetails: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
        state.userDetails = action.payload;
    },
    logoutUser: (state) => {
      state.userDetails = null;
    },
  },
});

export const { updateUserDetails, logoutUser } = userSlice.actions;

export const selectUserDetails = (state: {user: UserState}) => state.user.userDetails;

export default userSlice.reducer;
