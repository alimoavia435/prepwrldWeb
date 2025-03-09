
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const googlelogin = createAsyncThunk("googlelogin", async (data) => {
    try {
        console.log("in middle", data);
        const res = await api.post(`${API_URL}/auth/login`, data);
        return res.data;
    } catch (error) {
        return {
            message: error?.response?.data?.error,
            status: error?.response?.status,
        };
    }
});