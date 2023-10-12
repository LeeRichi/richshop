import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderProduct {
  orderId: string;
  productId: string;
  amount: number;
}

interface OrderProductState {
  orderProducts: OrderProduct[];
}

const initialState: OrderProductState = {
  orderProducts: [],
};

const orderProductSlice = createSlice({
  name: 'orderProducts',
  initialState,
  reducers: {
    setOrderProducts: (state, action: PayloadAction<OrderProduct[]>) => {
      state.orderProducts = action.payload;
    },
  },
});

export const { setOrderProducts } = orderProductSlice.actions;
export default orderProductSlice.reducer;
