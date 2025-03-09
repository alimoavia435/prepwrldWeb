// createUpdate.js


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const createUpdate = createAsyncThunk("createUpdate", async (data) => {
    try {
   
      const res = await api.post(`${API_URL}/property/getUpdate`, data);
      return res.data;
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });