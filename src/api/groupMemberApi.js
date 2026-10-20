import api from "./api";

const groupMemberApi = {
  /**
   * Lấy danh sách tất cả thành viên nhóm.
   * @returns {Promise<Array>} Danh sách thành viên.
   */
  getAllMembers: async () => {
    try {
      const response = await api.get("/api/user-group-members");
      return response.data;
    } catch (error) {
      console.error("Error fetching group members:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết của thành viên nhóm theo ID.
   * @param {number} userId - ID của user.
   * @param {number} groupId - ID của group.
   * @returns {Promise<Object>} Chi tiết thành viên nhóm.
   */
  getMemberById: async (userId, groupId) => {
    try {
      const response = await api.get(`/api/user-group-members/${userId}/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching group member with userId ${userId} and groupId ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Thêm thành viên vào nhóm.
   * @param {Object} memberData - Dữ liệu thành viên cần thêm.
   * @returns {Promise<Object>} Thành viên nhóm vừa được thêm.
   */
  addMember: async (memberData) => {
    try {
      const response = await api.post("/api/user-group-members", memberData);
      return response.data;
    } catch (error) {
      console.error("Error adding group member:", error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin thành viên nhóm.
   * @param {number} userId - ID của user.
   * @param {number} groupId - ID của group.
   * @param {Object} memberData - Dữ liệu cập nhật.
   * @returns {Promise<Object>} Thành viên nhóm đã được cập nhật.
   */
  updateMember: async (userId, groupId, memberData) => {
    try {
      const response = await api.put(`/api/user-group-members/${userId}/${groupId}`, memberData);
      return response.data;
    } catch (error) {
      console.error(`Error updating group member with userId ${userId} and groupId ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Xóa thành viên nhóm.
   * @param {number} userId - ID của user.
   * @param {number} groupId - ID của group.
   * @returns {Promise<Object>} Kết quả xóa.
   */
  deleteMember: async (userId, groupId) => {
    try {
      const response = await api.delete(`/api/user-group-members/${userId}/${groupId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting group member with userId ${userId} and groupId ${groupId}:`, error);
      throw error;
    }
  },
};

export default groupMemberApi;
