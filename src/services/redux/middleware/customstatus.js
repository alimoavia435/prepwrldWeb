import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const customstatus = createAsyncThunk(
  "changeStatus",
  async (datawithid) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "changeStatus");
      const res = await api.post(
        `${API_URL}/customExam/customExamStatus/${datawithid?.id}`,
        datawithid?.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, "customstatus customstatus");
      return res;
    } catch (error) {
      return {
        message: error?.response?.data || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
