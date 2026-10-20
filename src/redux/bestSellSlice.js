import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem('bestSells') ? JSON.parse(localStorage.getItem('bestSells')) : [],
    statusTab: false,
};

const bestSellSlice = createSlice({
    name: 'bestSell',
    initialState,
    reducers: {
        addBestSell: (state, action) => {
            const { productId } = action.payload;

            // Chỉ thêm productId nếu chưa tồn tại trong danh sách
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }

            // Lưu vào localStorage
            localStorage.setItem('bestSells', JSON.stringify(state.items));
        },
        removeBestSell: (state, action) => {
            const { productId } = action.payload;

            // Xóa productId khỏi danh sách
            state.items = state.items.filter(id => id !== productId);

            // Cập nhật localStorage
            localStorage.setItem('bestSells', JSON.stringify(state.items));
        },
        clearBestSells: (state) => {
            // Xóa toàn bộ danh sách
            state.items = [];

            // Xóa dữ liệu trong localStorage
            localStorage.removeItem('bestSells');
        },
    },
});

export const { addBestSell, removeBestSell, clearBestSells } = bestSellSlice.actions;

export default bestSellSlice.reducer;
