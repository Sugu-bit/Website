import api from "./api";

const groupApi = {
    getAllGroups: async () => {
        try {
            const response = await api.get("/user-groups");
            return response.data;
        } catch (error) {
            console.error("Error fetching groups:", error);
            throw error;
        }
    },

    getGroupById: async (id) => {
        try {
            const response = await api.get(`/user-groups/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching group with ID ${id}:`, error);
            throw error;
        }
    },

    createGroup: async (groupData) => {
        try {
            const response = await api.post("/user-groups", groupData);
            return response.data;
        } catch (error) {
            console.error("Error creating group:", error);
            throw error;
        }
    },

    updateGroup: async (id, groupData) => {
        try {
            const response = await api.put(`/user-groups/${id}`, groupData);
            return response.data;
        } catch (error) {
            console.error(`Error updating group with ID ${id}:`, error);
            throw error;
        }
    },

    deleteGroup: async (id) => {
        try {
            const response = await api.delete(`/user-groups/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting group with ID ${id}:`, error);
            throw error;
        }
    },
};

export default groupApi;
