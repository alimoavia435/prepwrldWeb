import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const forgetPassword = createAsyncThunk("forgetPassword", async (data) => {
    try {
        console.log("forgetPassword");
        const res = await api.post(`${API_URL}/auth/reset-password`, data);
        return {
            status: res?.status,
            data: res?.data?.data,
            token: res?.data?.token,
        };
    } catch (error) {
        return {
            message: error?.response?.data?.error,
            status: error?.response?.status,
        };
    }
});


export const verifyemail = createAsyncThunk("verifyemail", async (data) => {
    try {
        const res = await api.post(`${API_URL}/auth/verify-reset-code`, data);
        console.log("verifyemail", res)
        return {
            status: res?.status,
            data: res?.data?.data,
            token: res?.data?.token,
        };
    } catch (error) {
        return {
            message: error?.response?.data?.error,
            status: error?.response?.status,
        };
    }
});


