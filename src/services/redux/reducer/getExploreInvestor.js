import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getExploreDetail } from "../middleware/getExploreInvestors";

const initialState = {
  loading: false,
  error: "",
  getExploreDetailData : [],
};
const getExploreDetailSlice = createSlice({
  name: "getExploreDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExploreDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExploreDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.getExploreDetail = action.payload;
    });
    builder.addCase(getExploreDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getExploreDetailSlice.reducer;