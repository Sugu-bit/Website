import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileApi from "../api/fileApi";

// Async action: Lấy danh sách file từ API
export const fetchAndSaveFiles = createAsyncThunk(
  "files/fetchAndSaveFiles",
  async (_, { rejectWithValue }) => {
    try {
      const files = await fileApi.getAllFiles();
      return files;
    } catch (error) {
      console.error("Lỗi khi tải danh sách file:", error);
      return rejectWithValue(error.response?.data || "Không thể tải dữ liệu file");
    }
  }
);

const initialState = {
  productFiles: JSON.parse(sessionStorage.getItem("productFiles")) || [],
  reviewFiles: JSON.parse(sessionStorage.getItem("reviewFiles")) || [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    // Cập nhật file
    updateFile(state, action) {
      const { file } = action.payload;
      if (file.target === "products") {
        state.productFiles = state.productFiles.map((existingFile) =>
          existingFile.id === file.id ? file : existingFile
        );
      } else if (file.target === "reviews") {
        state.reviewFiles = state.reviewFiles.map((existingFile) =>
          existingFile.id === file.id ? file : existingFile
        );
      }

      // Lưu vào sessionStorage
      sessionStorage.setItem("productFiles", JSON.stringify(state.productFiles));
      sessionStorage.setItem("reviewFiles", JSON.stringify(state.reviewFiles));
    },

    // Xóa file
    deleteFile(state, action) {
      const { id, target } = action.payload;
      if (target === "products") {
        state.productFiles = state.productFiles.filter((file) => file.id !== id);
      } else if (target === "reviews") {
        state.reviewFiles = state.reviewFiles.filter((file) => file.id !== id);
      }

      // Lưu vào sessionStorage
      sessionStorage.setItem("productFiles", JSON.stringify(state.productFiles));
      sessionStorage.setItem("reviewFiles", JSON.stringify(state.reviewFiles));
    },
  },
  extraReducers: (builder) => {
    builder
      // Khi bắt đầu fetch
      .addCase(fetchAndSaveFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi fetch thành công
      .addCase(fetchAndSaveFiles.fulfilled, (state, action) => {
        const files = action.payload;

        // Phân loại files
        const productFiles = files.filter((file) => file.target === "products");
        const reviewFiles = files.filter((file) => file.target === "reviews");

        state.productFiles = productFiles;
        state.reviewFiles = reviewFiles;

        // Lưu vào sessionStorage
        sessionStorage.setItem("productFiles", JSON.stringify(productFiles));
        sessionStorage.setItem("reviewFiles", JSON.stringify(reviewFiles));

        state.loading = false;
      })
      // Khi fetch thất bại
      .addCase(fetchAndSaveFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã xảy ra lỗi khi tải danh sách file";
      });
  },
});

// Export actions
export const { updateFile, deleteFile } = fileSlice.actions;

// Export reducer
export default fileSlice.reducer;
