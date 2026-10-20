import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Danh sách yêu thích
  currentUserId: null, // ID của người dùng hiện tại hoặc null nếu không đăng nhập
};

const loveSlice = createSlice({
  name: 'love',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;

      if (action.payload) {
        // Người dùng đã đăng nhập: Tải danh mục yêu thích từ localStorage
        const lovedItems = localStorage.getItem(`lovedItems_${action.payload}`);
        state.items = lovedItems ? JSON.parse(lovedItems) : [];
      } else {
        // Người dùng không đăng nhập: Xóa danh mục yêu thích
        state.items = [];
      }
    },
    addToLove: (state, action) => {
      if (!state.currentUserId) {
        console.log("Current user ID:", state.currentUserId);
        // Người dùng chưa đăng nhập: Không cho phép thêm
        console.warn('Bạn cần đăng nhập để thêm sản phẩm vào danh mục yêu thích.');
        return;
      }

      const { productId } = action.payload;

      // Kiểm tra sản phẩm đã có trong danh mục yêu thích hay chưa
      const indexProductId = state.items.findIndex(item => item.productId === productId);

      if (indexProductId === -1) {
        state.items.push({ productId });

        // Cập nhật vào localStorage
        localStorage.setItem(
          `lovedItems_${state.currentUserId}`,
          JSON.stringify(state.items)
        );
      }
    },
    removeFromLove: (state, action) => {
      if (!state.currentUserId) {
        // Người dùng chưa đăng nhập: Không cho phép xóa
        console.warn('Bạn cần đăng nhập để xóa sản phẩm khỏi danh mục yêu thích.');
        return;
      }

      const { productId } = action.payload;

      // Xóa sản phẩm khỏi danh mục yêu thích
      state.items = state.items.filter(item => item.productId !== productId);

      // Cập nhật vào localStorage
      localStorage.setItem(
        `lovedItems_${state.currentUserId}`,
        JSON.stringify(state.items)
      );
    },
    clearLovedItems: (state) => {
      // Xóa toàn bộ danh mục yêu thích
      state.items = [];
      if (state.currentUserId) {
        localStorage.removeItem(`lovedItems_${state.currentUserId}`);
      }
    },
  },
});

export const {
  setCurrentUser,
  addToLove,
  removeFromLove,
  clearLovedItems,
} = loveSlice.actions;
export default loveSlice.reducer;
