import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const investorProfile = createAsyncThunk(
  "investorProfile",
  async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("token is....", token)
      const res = await api.get(`${API_URL}/KYC/investor-kyc`, {
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