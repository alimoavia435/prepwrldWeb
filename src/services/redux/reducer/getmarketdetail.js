import { createSlice } from "@reduxjs/toolkit";
import { getMarketDetail } from "../middleware/getMarketReportDetail";

const initialState = {
  loading: false,
  error: "",
  getMarketDetailData: null, // Change from [] to null for object storage
};

const getMarketDetailSlice = createSlice({
  name: "getMarketDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarketDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMarketDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.getMarketDetailData = action.payload?.data?.cms || null; // Store cms directly
    });
    builder.addCase(getMarketDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default getMarketDetailSlice.reducer;
