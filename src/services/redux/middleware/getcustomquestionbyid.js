import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const getcustomquestionbyid = createAsyncThunk(
  "getcustomquestionbyid",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "GenerateTest");
      const res = await api.get(
        `${API_URL}/customExam/getCustomExamQuestionById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
