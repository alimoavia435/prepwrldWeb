
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const claim = createAsyncThunk("claim", async (data) => {
    try {
      console.log("in middle",data);
      const res = await api.post(`${API_URL}/property/claimROI`, data);
      return res.data;
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });