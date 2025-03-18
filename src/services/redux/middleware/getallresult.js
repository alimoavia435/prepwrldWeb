import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const getallresult = createAsyncThunk("getexams", async (id) => {
    try {
        const token = localStorage.getItem('token')
        const res = await api.get(`${API_URL}/student/get-exam-results-for-teacher/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log("API Response:", res);
        if (res.data) {
            return {
                status: res.status,
                data: res.data,
            };
        } else {
            console.error("getallresult:", res.data);
            return {
                status: 404,
                message: "getFolgetexamsder",
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

