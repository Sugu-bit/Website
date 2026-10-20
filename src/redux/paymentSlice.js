import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [], // Danh sách sản phẩm được chọn để thanh toán
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addToPayment(state, action) {
      state.selectedItems.push(action.payload);
    },
    removeFromPayment(state, action) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearPayment(state) {
      state.selectedItems = [];
    },
    updatePaymentQuantity(state, action) {
        const { id, quantity } = action.payload;
        const item = state.selectedItems.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity; // Cập nhật số lượng
        }
    },
  },
});

export const { addToPayment, removeFromPayment, clearPayment, updatePaymentQuantity } = paymentSlice.actions;

export default paymentSlice.reducer;
