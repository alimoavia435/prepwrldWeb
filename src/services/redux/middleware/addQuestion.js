import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addQuestion = createAsyncThunk(
  "createCustomExam",
  async (datawithid) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "addQuestion,,,,");
      const res = await api.post(
        `${API_URL}/customExam/addQuestionToCustomExam/${datawithid?.id}`,
        datawithid?.data,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "addQuestionin middlee");
      return res;
    } catch (error) {
      return {
        message: error?.response?.data || "An error occurred",
        status: error?.response?.status || 500,
      };
    }
  }
);
