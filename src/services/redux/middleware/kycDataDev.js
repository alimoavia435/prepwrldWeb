
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const kycDataDev = createAsyncThunk("kycDataDev", async (id) => {
    try {
        const token = localStorage.getItem("token");

        const res = await api.get(
            `${API_URL}/KYC/developer-kyc`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("kycDataDev", res)
        return res;
    } catch (error) {
        console.error("Error in investorImageUpload:", error);
        return {
            message: error?.response?.data || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
