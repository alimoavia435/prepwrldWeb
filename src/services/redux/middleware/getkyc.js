import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getkyc = createAsyncThunk(
  "getkyc",
  async () => {
    try {
      const token = localStorage.getItem("tokendev");
      console.log("token is....",token)
      const res = await api.get(`${API_URL}/KYC/developer-kyc`, {
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
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);
