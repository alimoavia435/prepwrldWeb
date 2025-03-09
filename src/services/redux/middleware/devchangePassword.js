import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const devchangePassword = createAsyncThunk("changePassword", async (data) => {
  try {
    console.log("ccchangePassword",data);
    const res = await api.post(`${API_URL}/developer/reset-new-password`,data);
    console.log("newchangePassword",res);
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