import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getROI } from "../middleware/getRoi";

const initialState = {
  loading: false,
  error: "",
  getROIData : [],
};
const getROISlice = createSlice({
  name: "getExploreDetailById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getROI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getROI.fulfilled, (state, action) => {
      state.loading = false;
      state.getROI = action.payload;
    });
    builder.addCase(getROI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getROISlice.reducer;