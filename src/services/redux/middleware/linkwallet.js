
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const linkwallet = createAsyncThunk("linkwallet", async (datwithtype) => {
    try {
      console.log("in middle",datwithtype);
      const token = localStorage.getItem("token");
      const tokendev=localStorage.getItem("tokendev");
      const res = await api.post(`${API_URL}/investor/linkwallet`, datwithtype.data, {
        headers: {
          Authorization: `Bearer ${datwithtype?.type==="investor" ? token:tokendev}`,
        },
      });
      return res.data;
    } catch (error) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });