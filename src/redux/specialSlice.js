import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem('specialProducts') ? JSON.parse(localStorage.getItem('specialProducts')) : [],
    statusTab: false,
};

const specialProductSlice = createSlice({
    name: 'special',
    initialState,
    reducers: {
        addSpecialProduct: (state, action) => {
            const { productId } = action.payload;

            // Chỉ thêm productId nếu chưa tồn tại trong danh sách
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }

            // Lưu vào localStorage
            localStorage.setItem('specialProducts', JSON.stringify(state.items));
        },
        removeSpecialProduct: (state, action) => {
            const { productId } = action.payload;

            // Xóa productId khỏi danh sách
            state.items = state.items.filter(id => id !== productId);

            // Cập nhật localStorage
            localStorage.setItem('specialProducts', JSON.stringify(state.items));
        },
        clearSpecialProducts: (state) => {
            // Xóa toàn bộ danh sách
            state.items = [];

            // Xóa dữ liệu trong localStorage
            localStorage.removeItem('specialProducts');
        },
    },
});

export const { addSpecialProduct, removeSpecialProduct, clearSpecialProducts } = specialProductSlice.actions;

export default specialProductSlice.reducer;
