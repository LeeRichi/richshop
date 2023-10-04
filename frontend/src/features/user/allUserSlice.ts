import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInterface from '../../interface/UserInterface';

interface UserState {
  users: UserInterface[] | null;
}

const initialState: UserState = {
  users: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<UserInterface[]>) => {
        state.users = action.payload;
    },
  },
});

export const { setAllUsers } = userSlice.actions;

export const allUsers = (state: { user: UserState }) => state.user.users;

export default userSlice.reducer;
