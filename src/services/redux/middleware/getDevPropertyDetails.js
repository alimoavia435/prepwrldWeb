import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getDevPropertyDetailById = createAsyncThunk(
  " getDevPropertyDetailById",
  async (projectId) => {
    try {
      const res = await api.get(`${API_URL}/property/devProject/${projectId}`);
      return {
        status: res?.status,
        data: res?.data,
      };
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);
