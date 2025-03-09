import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const devresendVerification = createAsyncThunk("devresendVerification", async (data) => {
  try {
    console.log("devresendVerification");
    const res = await api.post(`${API_URL}/developer/resend-developer-verification`, data);
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