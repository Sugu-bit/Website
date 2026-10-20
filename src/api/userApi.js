import api, { handleError } from "./api";

const userApi = {
  /**
   * Lấy danh sách tất cả người dùng
   * @returns {Promise<Array>} Danh sách người dùng
   */
  getAllUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Lấy thông tin người dùng hiện tại (me)
   * @returns {Promise<Object>} Thông tin người dùng hiện tại
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/me");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Lấy thông tin chi tiết của một người dùng
   * @param {number} id - ID của người dùng
   * @returns {Promise<Object>} Chi tiết người dùng
   */
  getUserById: async (id) => {
    try {
      const response = await api.get("/users/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Tạo mới một người dùng
   * @param {Object} data - Dữ liệu người dùng
   * @param {string} data.username - Tên tài khoản
   * @param {string} data.email - Email
   * @param {string} data.password - Mật khẩu
   * @param {string} [data.phone] - Số điện thoại
   * @param {string} [data.address] - Địa chỉ
   * @returns {Promise<Object>} Thông tin người dùng mới tạo
   */
  createUser: async (data) => {
    try {
      const response = await api.post("/users", data);
      return response.data; 
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Cập nhật thông tin một người dùng
   * @param {number} id - ID của người dùng
   * @param {Object} data - Dữ liệu cần cập nhật
   * @param {string} [data.username] - Tên tài khoản
   * @param {string} [data.email] - Email
   * @param {string} [data.password] - Mật khẩu
   * @param {string} [data.phone] - Số điện thoại
   * @param {string} [data.address] - Địa chỉ
   * @returns {Promise<Object>} Thông tin người dùng sau cập nhật
   */
  updateUser: async (id, data) => {
    try {
      const response = await api.put("/users/" + id, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Xóa một người dùng
   * @param {number} id - ID của người dùng
   * @returns {Promise<Object>} Phản hồi sau khi xóa
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete("/users/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default userApi;
