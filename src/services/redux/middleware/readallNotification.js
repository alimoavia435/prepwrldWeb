import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const readallNotification = createAsyncThunk("readallNotification", async () => {
  try {
    const token =localStorage.getItem('token');
    const res = await api.get(`${API_URL}/api/read-all-notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", res);
      return {
        status: res.status,
        data: res.data,
      };
   
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      message: error?.response?.data || "Unknown error",
      status: error?.response?.status || 500,
    };
  }
});

