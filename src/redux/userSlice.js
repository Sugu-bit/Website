import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentUser } from './loveSlice';
import securityApi from "../api/securityApi";
import userApi from "../api/userApi";
// Thunk để làm mới Access Token
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, { getState }) => {
    const { refreshToken } = getState().user;
    const data = await securityApi.refreshToken(refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  }
);
// Thunk để lấy thông tin người dùng hiện tại
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await userApi.getCurrentUser(); // Gửi token để lấy thông tin
      console.log("Fetched current user:", user);
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);
// Thunk để đăng ký tài khoản
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.createUser(data);
      console.log("API Response:", response); // Debug dữ liệu
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to register user");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});
export const loginUser = (userData) => async (dispatch) => {
  dispatch(userSlice.actions.setUser(userData));
  try {
    const user = await dispatch(fetchCurrentUser()).unwrap(); // Lấy user từ backend
    if (user && user.id) {
      dispatch(setCurrentUser(user.id)); // Đồng bộ currentUserId với loveSlice
    } else {
      console.warn("No valid user ID found after login.");
    }
  } catch (error) {
    console.error("Failed to fetch user after login:", error);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(userSlice.actions.logout()); // Đăng xuất người dùng
  dispatch(setCurrentUser(null)); // Xóa danh mục yêu thích
};

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
