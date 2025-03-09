import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

// Add Developer Property
export const addProperty = createAsyncThunk("addProperty", async (data) => {
  try {
    const token = localStorage.getItem("tokendev");
    const res = await api.post(`${API_URL}/property/add-property`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Upload Developer Propert Images
export const uploadPropertyImage = createAsyncThunk("uploadPropertyImage", async (data) => {
  try {
    const token = localStorage.getItem("tokendev");
    const res = await api.post(`${API_URL}/property/uploadPropertyImage`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Get All developer Live Projects
export const getDevLiveProjects = createAsyncThunk("getDevLiveProjects", async (page) => {
  try {
    // console.log("Inside the Get All Live Projects API Before");
    const token = localStorage.getItem("tokendev");
    // console.log("token is....", token);
    const res = await api.get(`${API_URL}/developer/LiveProjects?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 console.log("Inside the Get All Live Projects API AFTER ===> ", res);
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Get All developer Projects
export const developerAllProjects = createAsyncThunk("developerAllProjects", async (page) => {
  try {
    // console.log("Inside the Get All Developer Projects API Before");
    const token = localStorage.getItem("tokendev");
    // console.log("token is....", token);
    console.log("page",page)
    const res = await api.get(`${API_URL}/developer/own-submissions?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Inside the Get All Developer Projects API AFTER ===> ", res);
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Make Live A Project
export const devMakeLiveProject = createAsyncThunk("devMakeLiveProject", async (data) => {
  try {
    const token = localStorage.getItem("tokendev");
    const res = await api.post(`${API_URL}/developer/makeLive`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Get developer a Project By ID
export const devGetProjectByID = createAsyncThunk("devGetProjectByID", async (projectId) => {
  try {
    // console.log("Inside the Developer Get A Project by ID API Before");
    const token = localStorage.getItem("tokendev");
    // console.log("token is....", token);
    const res = await api.get(`${API_URL}/property/devProject/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Inside the Developer Get A Project by ID API AFTER ===> ", res);
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
