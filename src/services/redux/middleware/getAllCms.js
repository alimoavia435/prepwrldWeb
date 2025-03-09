import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getCMS = createAsyncThunk("getCMS", async () => {
  try {
    const token = localStorage.getItem("token");

    console.log(token, "CMSS in middleware"); // Debug token

    const res = await api.get(`${API_URL}/admin/fetch-all-CMS`, {
      headers: {
        Authorization: `Bearer ${token}`, // Fix header formatting
      },
    });

    console.log(res, "DemoooCmss"); // Debug response

    return {
      status: res?.status,
      data: res?.data, // Only return actual data
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error || "An error occurred",
      status: error?.response?.status,
    };
  }
});
