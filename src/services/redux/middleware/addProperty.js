import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addProperty = createAsyncThunk("addProperty", async (formData) => {
  try {
    console.log("Inside the add property Before API", formData);
    const token = localStorage.getItem("tokendev");
    console.log("token is....", token);
    const res = await api.post(`${API_URL}/property/add-property`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Inside the add property After API", res);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

export const uploadPropertyImage = createAsyncThunk("uploadPropertyImage", async (data) => {
  try {
    console.log(data, "inside the uploadPropertyImage BEFORE");
    const token = localStorage.getItem("tokendev");
    console.log("token is....", token);
    const res = await api.post(`${API_URL}/property/uploadPropertyImage`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Inside the uploadPropertyImage After", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
