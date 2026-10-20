import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";
// Thunk để lấy tất cả sản phẩm trong giỏ hàng
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (_, { rejectWithValue }) => {
  try {
    const response = await cartApi.getAllCartItemUser();
    console.log(response);
    sessionStorage.setItem("cartItems", JSON.stringify(response)); // Lưu vào sessionStorage
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để thêm sản phẩm vào giỏ hàng
export const createCartItem = createAsyncThunk("cart/createCartItem", async (data, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState(); // Lấy giỏ hàng từ Redux state

    // Kiểm tra sản phẩm đã tồn tại
    const existingItem = cart.items.find((item) => item.productId === data.productId);
    if (existingItem) {
      throw new Error("Sản phẩm đã có trong giỏ hàng");
    }
    const response = await cartApi.createCartItem(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để cập nhật số lượng sản phẩm
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await cartApi.updateCartItem(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (id, { rejectWithValue }) => {
  try {
    const response = await cartApi.deleteCartItem(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(sessionStorage.getItem("cartItems")) || [],
    isLoading: false,
    error: null,
    isConfirmingRemove: false,
    productToRemove: null,
  },
  reducers: {
    requestRemoveItem(state, action) {
      state.isConfirmingRemove = true;
      state.productToRemove = action.payload;
    },
    confirmRemoveItem(state) {
      state.items = state.items.filter((item) => item.id !== state.productToRemove.id);
      state.isConfirmingRemove = false;
      state.productToRemove = null;
      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    cancelRemoveItem(state) {
      state.isConfirmingRemove = false;
      state.productToRemove = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(createCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
          sessionStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      });
  },
});


export const { requestRemoveItem, confirmRemoveItem, cancelRemoveItem } = cartSlice.actions;


export default cartSlice.reducer;
