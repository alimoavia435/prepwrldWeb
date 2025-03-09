import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const resendVerification = createAsyncThunk("resendVerification", async (data) => {
  try {
    console.log("resendVerification");
    const res = await api.post(`${API_URL}/auth/resend-code`, data);
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