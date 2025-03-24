import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const deleteCustomrooms = createAsyncThunk(
  "deleteCustomrooms",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(
        `${API_URL}/customExam/deleteCustomExamById/${id}`,
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
        console.error("deleteroom:", res.data);
        return {
          status: 404,
          message: "deleteroom",
        };
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      return {
        message: error?.response?.data || "Unknown error",
        status: error?.response?.status || 500,
      };
    }
  }
);
