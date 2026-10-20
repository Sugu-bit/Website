import api, { handleError } from "./api";

const fileApi = {
    getAllFiles: async () => {
        try {
            const response = await api.get("/files/all");
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getFilesPaginated: async (page = 1, limit = 10) => {
        try {
            const response = await api.get("/files", { params: { page, limit } });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getFileById: async (id) => {
        try {
            const response = await api.get("/files/"+id);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getFilesByUser: async (userId) => {
        try {
            const response = await api.get("/files/user/"+userId);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getFilesByProduct: async (productId, onlyActive = true) => {
        try {
            const response = await api.get("/files/product/"+productId, {
                params: { onlyActive },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getFilesByReview: async (reviewId, onlyActive = true) => {
        try {
            const response = await api.get("/files/review/"+reviewId, {
                params: { onlyActive },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    uploadFile: async (file, data) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const response = await api.post("/files", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    updateFile: async (id, data) => {
        try {
            const response = await api.put("/files/"+id, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    deleteFile: async (id) => {
        try {
            const response = await api.delete("/files/"+id);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

export default fileApi;
