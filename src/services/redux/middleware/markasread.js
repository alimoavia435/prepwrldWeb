import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const markasread = createAsyncThunk("markasread", async (id) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token", token)
        const res = await api.put(
            `${API_URL}/api/read-notifications/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("markasreadrsponse", res)
        return {
            status: res?.status,
            message: res?.data,
        };
    } catch (error) {
        console.error("Error in investorImageUpload:", error);
        return {
            message: error?.response?.data || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
