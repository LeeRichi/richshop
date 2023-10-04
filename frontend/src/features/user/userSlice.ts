import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInterface from '../../interface/UserInterface';

interface UserState {
  userDetails: UserInterface | null;
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
    updateUserDetails: (state, action: PayloadAction<UserInterface>) => {
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
