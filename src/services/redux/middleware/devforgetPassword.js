import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const devforgetPassword = createAsyncThunk("devforgetPassword", async (data) => {
  try {
    console.log("devforgetPassword",data);
    const res = await api.post(`${API_URL}/developer/reset-developer-password`, data);
    console.log("devforgetPassword",res)
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