import { createSlice } from "@reduxjs/toolkit";
import { getCMS } from "../middleware/getAllCms";

const initialState = {
  loading: false,
  error: "",
  getCMSData: [], // Correct initial state
};

const getCMSSlice = createSlice({
  name: "getCMS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCMS.pending, (state) => {
      state.loading = true;
      state.error = ""; // Reset error on new request
    });
    builder.addCase(getCMS.fulfilled, (state, action) => {
      state.loading = false;
      state.getCMSData = action.payload.data; // Fix state update
    });
    builder.addCase(getCMS.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default getCMSSlice.reducer;
