import api from "./api";

const groupPermissionApi = {
  /**
   * Lấy danh sách tất cả Group Permissions.
   * @returns {Promise<Array>} Danh sách các Group Permission.
   */
  getAllPermissions: async () => {
    try {
      const response = await api.get("/api/group-permissions");
      return response.data;
    } catch (error) {
      console.error("Error fetching group permissions:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết Group Permission theo ID.
   * @param {number} id - ID của Group Permission.
   * @returns {Promise<Object>} Chi tiết của Group Permission.
   */
  getPermissionById: async (id) => {
    try {
      const response = await api.get(`/api/group-permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching group permission with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Thêm một Group Permission mới.
   * @param {Object} permissionData - Dữ liệu Group Permission cần thêm.
   * @returns {Promise<Object>} Group Permission vừa được thêm.
   */
  addPermission: async (permissionData) => {
    try {
      const response = await api.post("/api/group-permissions", permissionData);
      return response.data;
    } catch (error) {
      console.error("Error adding group permission:", error);
      throw error;
    }
  },

  /**
   * Cập nhật Group Permission.
   * @param {number} id - ID của Group Permission cần cập nhật.
   * @param {Object} permissionData - Dữ liệu cập nhật Group Permission.
   * @returns {Promise<Object>} Group Permission sau khi cập nhật.
   */
  updatePermission: async (id, permissionData) => {
    try {
      const response = await api.put(`/api/group-permissions/${id}`, permissionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating group permission with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa Group Permission.
   * @param {number} id - ID của Group Permission cần xóa.
   * @returns {Promise<Object>} Kết quả xóa.
   */
  deletePermission: async (id) => {
    try {
      const response = await api.delete(`/api/group-permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting group permission with id ${id}:`, error);
      throw error;
    }
  },
};

export default groupPermissionApi;
