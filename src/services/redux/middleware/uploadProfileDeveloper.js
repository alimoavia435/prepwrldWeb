import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const developerImageUpload = createAsyncThunk(
  "developerImageUpload",
  async (data) => {
    try {
      const token = localStorage.getItem("tokendev");
      console.log("developerImageUpload");
      const res = await api.post(`${API_URL}/investor/profile-image`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        status: res?.status,
        message: res?.data?.message,
        user: res?.data?.user,
      };
    } catch (error) {
      console.error("Error developerImageUpload:", error);
      return {
        message: error?.response?.data?.error || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
