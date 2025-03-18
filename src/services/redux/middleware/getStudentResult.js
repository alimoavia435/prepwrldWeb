import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const getStudentResult = createAsyncThunk("getStudentResult", async (id) => {
    try {
        const token = localStorage.getItem("tokendev");
        console.log(token, "GenerateTest");
        const res = await api.get(
            `${API_URL}/student/get-result-for-student/${id}`,
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
