import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getROI = createAsyncThunk("getROI", async (data) => {
  try {

    const token = localStorage.getItem("token");

    console.log(data, "datais in midleware");
    console.log(token, "datais in midleware");
  
    const res = await api.get(`${API_URL}/property/getROI`, data, {
      headers: {
        Authorization:`Bearer${token}`,
      },
    });
    console.log(res,"rrrrrrrrr");
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error || "An error occurred",
      status: error?.response?.status,
    };
  }
});
