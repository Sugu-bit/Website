import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: localStorage.getItem('suggestions') ? JSON.parse(localStorage.getItem('suggestions')) : [],
  statusTab: false, 
};

const suggestSlice = createSlice({
  name: 'suggest',
  initialState,
  reducers: {
    addSuggestion: (state, action) => {
      const { productId } = action.payload;

      // Chỉ thêm productId nếu chưa tồn tại trong danh sách
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }

      // Lưu vào localStorage
      localStorage.setItem('suggestions', JSON.stringify(state.items));
    },
    removeSuggestion: (state, action) => {
      const { productId } = action.payload;

      // Xóa productId khỏi danh sách
      state.items = state.items.filter(id => id !== productId);

      // Cập nhật localStorage
      localStorage.setItem('suggestions', JSON.stringify(state.items));
    },
    clearSuggestions: (state) => {
      // Xóa toàn bộ danh sách
      state.items = [];

      // Xóa dữ liệu trong localStorage
      localStorage.removeItem('suggestions');
    },
  },
});

export const { addSuggestion, removeSuggestion, clearSuggestions } = suggestSlice.actions;

export default suggestSlice.reducer;
