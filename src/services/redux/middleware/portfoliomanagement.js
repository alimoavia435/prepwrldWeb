import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const portfoliomanagement = createAsyncThunk(
  "getkyc",
  async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token is....",token)
      const res = await api.get(`${API_URL}/investor/portfolio-Management`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);
