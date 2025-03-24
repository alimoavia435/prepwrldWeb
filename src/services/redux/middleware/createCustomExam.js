import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const createCustomExam = createAsyncThunk(
  "createCustomExam",
  async (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "CreateSubject,,,,");
      const res = await api.post(`${API_URL}/customExam/createCustomExam`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "CreateSubjectin middlee");
      return res;
    } catch (error) {
      return {
        message: error?.response?.data || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
