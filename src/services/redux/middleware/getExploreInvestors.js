import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const getExploreDetail = createAsyncThunk(
  "getExploreDetail",
  async (page) => {
    try {
      const res = await api.get(
        `${API_URL}/explore/displayAllLiveProjects?page=${page}`,
       
      );

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
