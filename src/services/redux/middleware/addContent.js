import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../apiInterceptor";
import { API_URL } from "../../client";

export const addContent = createAsyncThunk("addContent", async (datawithid) => {
  try {
    console.log("Add course data is.............", datawithid);
    const formData = new FormData();
    formData.append("title", datawithid?.data?.title);
    formData.append("description", datawithid?.data?.description);
    formData.append("caption1", datawithid?.data?.caption1);
    formData.append("caption2", datawithid?.data?.caption2);
    formData.append("caption3", datawithid?.data?.caption3);
    if (datawithid?.data?.thumbnailImage) {
      formData.append("thumbnailImage", datawithid?.data?.thumbnailImage);
    }
    const res = await api.post(`${API_URL}/content/add-content/${datawithid?.folderid}`, formData);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

export const getcontent = createAsyncThunk("getcontent", async (folderid) => {
  try {
    const res = await api.get(`${API_URL}/content/contentLibrary/${folderid}`);
    console.log("API Response:", res);
    if (res.data) {
      return {
        status: res.status,
        data: res.data,
      };
    } else {
      console.error("getcontent:", res.data);
      return {
        status: 404,
        message: "getcontent",
      };
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      message: error?.response?.data?.error || "Unknown error",
      status: error?.response?.status || 500,
    };
  }
});
export const deleteContent = createAsyncThunk("deleteContent", async (data) => {
  try {
    console.log("deleteFolder data is.............", data);
    const res = await api.delete(`${API_URL}/content/delete-content/${data?.folderId}/${data?.selectedLecture}`);
    console.log("responseAddcourse", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
// export const getspecificcontent = createAsyncThunk("getspecificcontent", async (data) => {
//   try {
//     const res = await api.get(`${API_URL}/content/content-details/${data?.folderId}/${data?.contentId}`);
//     console.log("API Response:", res);
//     if (res.data) {
//       return {
//         status: res.status,
//         data: res.data,
//       };
//     } else {
//       console.error("getspecificcontent:", res.data);
//       return {
//         status: 404,
//         message: "getspecificcontent",
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching course:", error);
//     return {
//       message: error?.response?.data?.error || "Unknown error",
//       status: error?.response?.status || 500,
//     };
//   }
// });
export const getSpecificContent = createAsyncThunk("getSpecificContent", async (data) => {
  try {
    console.log("getSpecificContent data is.............", data);
    const res = await api.get(`${API_URL}/content/content-details/${data?.folderid}/${data?.id}`);
    console.log("responseAddcourse", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
export const updateContent = createAsyncThunk("updateContent", async (datawithid) => {
  try {
    console.log("update course data is.............", datawithid);
    const formData = new FormData();
    formData.append("title", datawithid?.data?.title);
    formData.append("description", datawithid?.data?.description);
    formData.append("caption1", datawithid?.data?.caption1);
    formData.append("caption2", datawithid?.data?.caption2);
    formData.append("caption3", datawithid?.data?.caption3);
    if (datawithid?.data?.thumbnailImage) {
      formData.append("thumbnailImage", datawithid?.data?.thumbnailImage);
    }
    const res = await api.put(`${API_URL}/content/update-content/${datawithid?.folderid}/${datawithid?.id}`, formData);
    console.log("response", res.data);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
