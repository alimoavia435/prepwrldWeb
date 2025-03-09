import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const signup = createAsyncThunk("signin", async (data) => {
  try {
    console.log("middle to be sent:", data);

    console.log("Signup");
    const res = await api.post(`${API_URL}/developer/register-property-developer`, data);
    console.log(res, "middlewre");
    return {
      status: res?.status,
      data: res?.data,
      token: res?.data?.token,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
export const signin = createAsyncThunk("signin", async (data) => {
  try {
    const res = await api.post(`${API_URL}/auth/login`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
// export const propsignin = createAsyncThunk("propsignin", async (data) => {
//   try {
//     console.log(data, "propdata");
//     const res = await api.post(`${API_URL}/auth/login`, data);
//     console.log("response", res.data);
//     return res.data;
//   } catch (error) {
//     return {
//       message: error?.response?.data?.error,
//       status: error?.response?.status,
//     };
//   }
// });
export const investorSignup = createAsyncThunk("investorSignup", async (data) => {
  try {
    console.log(data, "signupdatainves");
    const res = await api.post(`${API_URL}/investor/sign-up`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

export const verifyaccount = createAsyncThunk("verifyaccount", async (data) => {
  try {
    console.log(data, "verifyaccount");
    const res = await api.post(`${API_URL}/auth/verify-email`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
export const verifyaccountDeveloper = createAsyncThunk("verifyaccountdeveloper", async (data) => {
  try {
    console.log(data, "verifyaccountdeveloper");
    const res = await api.post(`${API_URL}/auth/verify-email`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
export const resendCode = createAsyncThunk("resendcode", async (data) => {
  try {
    console.log(data, "resendcode");
    const res = await api.post(`${API_URL}/auth/resend-code`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

export const uploadfile = createAsyncThunk("uploadfile", async (data) => {
  try {
    console.log(data, "signupdatainves");
    const res = await api.post(`${API_URL}/developer/upload-developer-image`, data);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
