import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getAllSubmissions = createAsyncThunk(
  "getAllSubmissions",
  async (page) => {
    try {
      const token = localStorage.getItem("tokendev");
      console.log("token submissions is....", token);

      const res = await api.get(`${API_URL}/developer/own-submissions?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        status: res?.status,
        data: res?.data,
      };
    } catch (error) {
      return {
        message: error?.response?.data?.error || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
