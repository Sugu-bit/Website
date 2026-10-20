import api from "./api";

const userPermissionApi = {
  /**
   * Lấy danh sách tất cả quyền của người dùng.
   * @returns {Promise<Array>} Danh sách quyền.
   */
  getAllPermissions: async () => {
    try {
      const response = await api.get("/api/permission");
      return response.data;
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của một quyền theo ID.
   * @param {number} id - ID của quyền cần lấy thông tin.
   * @returns {Promise<Object>} Chi tiết quyền.
   */
  getPermissionById: async (id) => {
    try {
      const response = await api.get(`/api/user-permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching permission with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Gán quyền mới cho người dùng.
   * @param {Object} permissionData - Dữ liệu quyền cần gán.
   * @param {number} userId
   * @returns {Promise<Object>} Quyền vừa được gán.
   */
  assignPermissions: async ({ userId, permissionData }) => {
    try {
      const response = await api.post("/api/user-permissions", {
        user_id: userId,
        permissions:permissionData ,
      });
      return response.data; // Trả về kết quả gán quyền
    } catch (error) {
      console.error("Error assigning permissions:", error);
      throw error;
    }
  },

  /**
   * Cập nhật quyền của người dùng.
   * @param {number} userId - ID của người dùng cần cập nhật quyền.
   * @param {Object} permissionData - Dữ liệu cập nhật.
   * @returns {Promise<Object>} Quyền đã được cập nhật.
   */
  // Cập nhật quyền cho người dùng
  updatePermissions: async ({ userId, permissionData }) => {
    try {
      const response = await api.put("/api/user-permissions", {
        user_id: userId,
        permissions: permissionData,
      });
      return response.data; // Trả về kết quả cập nhật quyền
    } catch (error) {
      console.error("Error updating permissions:", error);
      throw error;
    }
  },

  /**
 * Thu hồi quyền của người dùng.
 * @param {Object} params - Thông tin cần thiết để thu hồi quyền.
 * @param {number} params.userId - ID của người dùng.
 * @param {string[]} params.permissions - Danh sách quyền cần thu hồi.
 * @returns {Promise<Object>} Thông báo kết quả thu hồi quyền.
 */
  revokePermissions: async ({ userId, permissions }) => {
    try {
      const response = await api.delete("/api/user-permissions", {
        data: {
          user_id: userId,
          permissions: permissions,
        },
      });
      return response.data; // Trả về thông báo kết quả
    } catch (error) {
      console.error("Error revoking permissions:", error);
      throw error;
    }
  }
};

export default userPermissionApi;
