import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const changeStatus = createAsyncThunk("changeStatus", async (datawithid) => {
    try {
        const token = localStorage.getItem("token");
        console.log(token, "changeStatus");
        const res = await api.post(
            `${API_URL}/exam/changeStatus/${datawithid?.id}`,
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
