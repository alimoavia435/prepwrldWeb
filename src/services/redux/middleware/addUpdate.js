import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addUpdate = createAsyncThunk("addUpdate", async (data) => {
    try {
        const token = localStorage.getItem("tokendev");
        console.log(token,"addUpdate");
        const res = await api.post(
            `${API_URL}/property/addUpdate`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res,"updatesssss");
        return res;
    } catch (error) {
        console.error("Error in investorImageUpload:", error);
        return {
            message: error?.response?.data || "An error occurred",
            status: error?.response?.status || 500,
        };
    }
});
