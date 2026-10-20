import api, { handleError } from "./api";

const categoryApi = {
    getAllCategories: async () => {
        try {
            const response = await api.get("/categories");
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = await api.get("/categories/" + id);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    createCategory: async (data) => {
        try {
            const response = await api.post("/categories", data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    updateCategory: async (id, data) => {
        try {
            const response = await api.put("/categories/" + id, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    deleteCategory: async (id) => {
        try {
            const response = await api.delete("/categories/" + id);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Lấy danh sách subcategories của một category.
     * @param {number} categoryId - ID của category.
     * @returns {Promise<Array>} Danh sách subcategories.
     */
    getSubcategories: async (categoryId) => {
        try {
            const response = await api.get(`/categories/${categoryId}/subcategories`);
            return response.data; // Trả về danh sách subcategories
        } catch (error) {
            handleError(error);
        }
    },
};

export default categoryApi;
