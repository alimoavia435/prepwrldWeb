import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const propertyDeveloperProfile = createAsyncThunk(
  "propertyDeveloperProfile",
  async () => {
    try {
      const token = localStorage.getItem("tokendev");

      console.log("token profileee is....", token)
      const res = await api.get(`${API_URL}/developer/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   return res
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);