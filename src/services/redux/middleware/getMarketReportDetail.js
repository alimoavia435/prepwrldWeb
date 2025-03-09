import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../client";
import api from "../../apiInterceptor";

export const getMarketDetail = createAsyncThunk(
  "getMarketDetail",
  async (id) => {
    try {
      const res = await api.get(`${API_URL}/admin/fetch-cms/${id}`);
      if (!res.data) {
        throw new Error("Failed to fetch market details");
      }
      return {
        status: res.status,
        data: res.data,
      };
    } catch (error) {
      return {
        message: error?.response?.data?.error || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
