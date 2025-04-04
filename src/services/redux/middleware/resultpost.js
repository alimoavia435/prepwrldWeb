import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const resultpost = createAsyncThunk("resultpost", async (data) => {
    try {
        const token = localStorage.getItem("tokendev");
        console.log(token, "GenerateTest");
        const res = await api.post(
            `${API_URL}/student/add-result`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res, "CreateSubjectin middlee");
        return res;
    } catch (error) {
        return {
            message: error?.response?.data || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
