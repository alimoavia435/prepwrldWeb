import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const updatekyc = createAsyncThunk("updatekyc", async (data) => {
    try {
      console.log(data, "updatekycdata");
      const token = localStorage.getItem("tokendev");
      const res = await api.put(`${API_URL}/KYC/updatekyc`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log("response", res.data);
      return res.data;
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });