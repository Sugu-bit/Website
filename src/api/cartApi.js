// src/api/cartApi.js
import api, { handleError } from "./api";


const cartApi = {

  getAllCartItems: async () => {
    try{
      const response = await api.get("/cart/all");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getAllCartItemUser: async () => {
    try{
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getCartItemById: async (id) => {
    try {
      const response = await api.get("/cart/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createCartItem: async (data) => {
    try {
      const response = await api.post("/cart", data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateCartItem: async (id, data) => {
    try {
      const response = await api.put("/cart/" + id, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteCartItem: async (id) => {
    try {
      const response = await api.delete("/cart/" + id);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default cartApi;
