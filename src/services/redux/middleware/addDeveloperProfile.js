import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addDeveloperProfile = createAsyncThunk("addDeveloperProfile", async (data) => {
    try {
      console.log(data, "data");
      const token = localStorage.getItem("tokendev");
      console.log(token,"tokendevv");
      console.log(data,"datattttttt");
      const res = await api.put(`${API_URL}/developer/profileKYC`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log("response", res);
      return res.data;
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });