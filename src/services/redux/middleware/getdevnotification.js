import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const getdevnotification = createAsyncThunk("getdevnotification", async () => {
  try {
    const token =localStorage.getItem('tokendev');
    const res = await api.get(`${API_URL}/api/get-notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", res);
    if (res.data) {
      return {
        status: res.status,
        data: res.data,
      };
    } else {
      console.error("getdevnotification:", res.data);
      return {
        status: 404,
        message: "",
      };
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      message: error?.response?.data || "Unknown error",
      status: error?.response?.status || 500,
    };
  }
});

