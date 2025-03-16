import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";
export const Gene_rate_Test = createAsyncThunk("Gene_rate_Test", async (datawithid) => {
    try {
        const token = localStorage.getItem("token");
        console.log(token, "GenerateTest");
        const res = await api.post(
            `${API_URL}/teacher/generate-test/${datawithid?.roomId}`,
            datawithid?.data,
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
