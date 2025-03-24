import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const updateRoom = createAsyncThunk(
  "getroomByid",
  async (datawithid) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `${API_URL}/teacher/update-roomName/${datawithid?.id}`,
        datawithid?.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", res);
      if (res.data) {
        return {
          status: res.status,
          data: res.data,
        };
      } else {
        console.error("getFolder:", res.data);
        return {
          status: 404,
          message: "getFolder",
        };
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      return {
        message: error?.response?.data?.error || "Unknown error",
        status: error?.response?.status || 500,
      };
    }
  }
);
