import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const devVerifyEmail = createAsyncThunk("devVerifyEmail", async (data) => {
  try {
    console.log("devVerifyEmail");
    const res = await api.post(`${API_URL}/developer/developer-forget-verficition`, data);
    return {
      status: res?.status,
      data: res?.data?.data,
      token: res?.data?.token,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});