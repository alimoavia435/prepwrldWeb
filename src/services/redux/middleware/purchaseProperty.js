import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const purchaseProperty = createAsyncThunk("purchaseProperty", async (data) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token", token)
        const res = await api.post(
            `${API_URL}/property/purchaseProperty`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("purchaseProperty", res)
        return {
            status: res?.status,
            message: res?.data,
            user: res?.data?.user,
        };
    } catch (error) {
        console.error("Error in investorImageUpload:", error);
        return {
            message: error?.response?.data || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
