import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const investorImageUpload = createAsyncThunk("investorImageUpload", async (data) => {
    try {
        const token = localStorage.getItem("token");
        console.log("investorImageUpload");
        const res = await api.post(
            `${API_URL}/investor/profile-image`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return {
            status: res?.status,
            message: res?.data?.message,
            user: res?.data?.user,
        };
    } catch (error) {
        console.error("Error in investorImageUpload:", error);
        return {
            message: error?.response?.data?.error || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
