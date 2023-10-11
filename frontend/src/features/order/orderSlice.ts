import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {OrderInterface} from '../../interface/OrderInterface';

interface OrderState {
  orders: OrderInterface[] | null;
}

const initialState: OrderState = {
  orders: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAllOrders: (state, action: PayloadAction<OrderInterface[]>) => {
        state.orders = action.payload;
    },
  },
});

export const { setAllOrders } = orderSlice.actions;

export const allUsers = (state: { order: OrderState }) => state.order.orders;

export default orderSlice.reducer;
