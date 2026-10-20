import { createSlice } from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";

const initialState = {
  items: JSON.parse(sessionStorage.getItem("categories")) || [], // Node lá
  categoryTree: JSON.parse(sessionStorage.getItem("categoryTree")) || [], // Node cấp 2
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loadCategoriesSuccess(state, action) {
      state.loading = false;
      state.items = action.payload.items;
      state.categoryTree = action.payload.categoryTree;
    },
    loadCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions
export const { startLoading, loadCategoriesSuccess, loadCategoriesFailure } = categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
  // Kiểm tra nếu danh mục đã được lưu trong sessionStorage
  const storedCategories = sessionStorage.getItem("categories");
  const storedCategoryTree = sessionStorage.getItem("categoryTree");

  if (storedCategories && storedCategoryTree) {
    dispatch(
      loadCategoriesSuccess({
        items: JSON.parse(storedCategories),
        categoryTree: JSON.parse(storedCategoryTree),
      })
    );
    return;
  }

  // Nếu chưa có trong sessionStorage, gọi API
  dispatch(startLoading());
  try {
    const data = await categoryApi.getAllCategories();

    // Xây dựng bản đồ danh mục
    const categoryMap = {};

    data.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    data.forEach((category) => {
      const parentId = category.hierarchyPathById
        .split("/")
        .slice(-2, -1)[0]; // Lấy parentId từ hierarchyPathById

      if (parentId && categoryMap[parentId]) {
        categoryMap[parentId].children.push(categoryMap[category.id]);
      }
    });

    // Xác định node cấp 2
    const rootNodes = Object.values(categoryMap).filter(
      (category) => !category.hierarchyPathById.includes("/")
    );

    // Lấy danh sách node cấp 2 từ các node gốc
    const secondLevelNodes = rootNodes.flatMap((rootNode) => rootNode.children);

    // Lọc ra node lá
    const leafNodes = Object.values(categoryMap).filter(
      (category) => category.children.length === 0
    );

    // Lưu cây danh mục bắt đầu từ node cấp 2 và node lá vào sessionStorage
    sessionStorage.setItem("categoryTree", JSON.stringify(secondLevelNodes));
    sessionStorage.setItem("categories", JSON.stringify(leafNodes));

    // Dispatch cả hai
    dispatch(
      loadCategoriesSuccess({
        items: leafNodes,
        categoryTree: secondLevelNodes,
      })
    );
  } catch (error) {
    dispatch(loadCategoriesFailure(error.message));
  }
};

export default categorySlice.reducer;
