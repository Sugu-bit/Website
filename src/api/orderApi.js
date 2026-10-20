import api, { handleError } from "./api";


const orderApi = {

  getAllOrders: async () => {
    try{
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getOrderById: async (id) => {
    try{
      const response = await api.get("/orders/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createOrder: async (data) => {
    try{
      const response = await api.post("/orders", data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateOrder: async (id, data) => {
    try{
      const response = await api.put("/orders/" + id, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteOrder: async (id) => {
    try{
      const response = await api.delete("/orders/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default orderApi;
