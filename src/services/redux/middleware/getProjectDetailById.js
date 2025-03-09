import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getExploreDetailById = createAsyncThunk(
    " getExploreDetailById",
    async (projectId) => {  
      try {
        const res = await api.get(`${API_URL}/property/projects/${projectId}`);
        return {
          status: res?.status,
          data: res?.data,
        };
      } catch (error) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );
