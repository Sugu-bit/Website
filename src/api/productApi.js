import api, { handleError } from "./api";

const productApi = {
  /**
   * Lấy danh sách sản phẩm.
   * @returns {Promise<Array>} Danh sách sản phẩm.
   */
  getProducts: async ({ page, pageSize }) => {
    try {
      const response = await api.get(`/products?page=${page}&pageSize=${pageSize}`);
      return response.data; // Giả sử API trả về { products, totalItems }
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Lấy chi tiết sản phẩm theo ID.
   * @param {number} id - ID của sản phẩm.
   * @returns {Promise<Object>} Chi tiết sản phẩm.
   */
  getProductById: async (id) => {
    try {
      const response = await api.get("/products/"+id);
      return response.data; // Trả về chi tiết sản phẩm
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Tạo sản phẩm mới.
   * @param {Object} productData - Dữ liệu của sản phẩm cần tạo.
   * @returns {Promise<Object>} Sản phẩm mới được tạo.
   */
  createProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData);
      return response.data; // Trả về sản phẩm mới được tạo
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Cập nhật sản phẩm theo ID.
   * @param {number} id - ID của sản phẩm cần cập nhật.
   * @param {Object} productData - Dữ liệu cập nhật sản phẩm.
   * @returns {Promise<Object>} Sản phẩm đã cập nhật.
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put("/products/"+id, productData);
      return response.data; // Trả về sản phẩm đã cập nhật
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Xóa sản phẩm theo ID.
   * @param {number} id - ID của sản phẩm cần xóa.
   * @returns {Promise<Object>} Thông báo xóa thành công.
   */
  deleteProduct: async (id) => {
    try {
      const response = await api.delete("/products/"+id);
      return response.data; // Trả về thông báo xóa thành công
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Lấy danh sách sản phẩm theo danh mục.
   * @param {number} categoryId - ID của danh mục.
   * @returns {Promise<Array>} Danh sách sản phẩm trong danh mục.
   */
  getProductsByCategoryId: async (categoryId) => {
    try {
      const response = await api.get(`/products/by-category/${categoryId}`);
      return response.data; // Trả về danh sách sản phẩm
    } catch (error) {
      handleError(error);
    }
  },

    /**
   * Cập nhật thuộc tính sản phẩm theo ID.
   * @param {number} id - ID của sản phẩm cần cập nhật.
   * @param {Object} attributeData - Dữ liệu thuộc tính sản phẩm.
   * @returns {Promise<Object>} Kết quả cập nhật thuộc tính sản phẩm.
   */
  updateProductAttributes: async (id, attributeData) => {
    try {
      console.log(attributeData);
      const response = await api.put(`/products/${id}/attribute`, attributeData);
      return response.data; // Trả về kết quả cập nhật
    } catch (error) {
      handleError(error);
    }
  },
  /**
 * Lấy danh sách sản phẩm có phân trang.
 * @param {number} page - Trang hiện tại.
 * @param {number} limit - Số sản phẩm trên mỗi trang.
 * @returns {Promise<Object>} Danh sách sản phẩm và thông tin phân trang.
 */
  getPaginatedProducts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/products`, {
        params: { page, limit }, // Tham số phân trang
      });
      console.log("Fetching Products with:", response.data);
      return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
      handleError(error);
    }
  },
  searchProductsByKeywords: async (keywords) => {
    const response = await api.get(`/search/products?keywords=${keywords}`);
    console.log(response)
    if (response.data.status !== "success") {
      throw new Error("Không thể tải dữ liệu.");
    }
    return response.data;
  },

};

export default productApi;
