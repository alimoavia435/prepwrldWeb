import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addProfile = createAsyncThunk("addProfile", async (data) => {
    try {
      console.log(data, "data");
      const token = localStorage.getItem("token");
      const res = await api.put(`${API_URL}/investor/profileKYC`, data,{
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