import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const complaint = createAsyncThunk("complaint", async (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      `${API_URL}/teacher/sendComplaint`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", res);
    if (res.data) {
      return {
        status: res.status,
        data: res.data,
      };
    } else {
      console.error("addStudent:", res.data);
      return {
        status: 404,
        message: "addStudent",
      };
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      message: error?.response?.data || "Unknown error",
      status: error?.response?.status || 500,
    };
  }
});
