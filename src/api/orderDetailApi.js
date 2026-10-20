import api, { handleError } from "./api";


const orderDetailApi = {

  getAllOrderDetails: async () => {
    try {
      const response = await api.get("/order-details");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getOrderDetailById: async (id) => {
    try {
      const response = await api.get("/order-details/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createOrderDetail: async (data) => {
    try {
      const response = await api.post("/order-details", data);
      return response.data; 
    } catch (error) {
      handleError(error);
    }
  },

  updateOrderDetail: async (id, data) => {
    try {
      const response = await api.put("/order-details/" + id, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteOrderDetail: async (id) => {
    try {
      const response = await api.delete("/order-details/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default orderDetailApi;
