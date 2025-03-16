import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const getAlldata = createAsyncThunk("getAlldata", async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await api.get(`${API_URL}/teacher/get-question-stats`);
        console.log("API Response:", res);
        if (res.data) {
            return {
                status: res.status,
                data: res.data,
            };
        } else {
            console.error("getAlldata:", res.data);
            return {
                status: 404,
                message: "getAlldata",
            };
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        return {
            message: error?.response?.data || "Unknown error",
            status: error?.response?.status || 500,
        };
    }
});

