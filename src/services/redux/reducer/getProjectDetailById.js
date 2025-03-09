import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getExploreDetailById } from "../middleware/getProjectDetailById";

const initialState = {
  loading: false,
  error: "",
  getExploreDetailByIdlData : [],
};
const getExploreDetailByIdSlice = createSlice({
  name: "getExploreDetailById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExploreDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExploreDetailById.fulfilled, (state, action) => {
      state.loading = false;
      state.getExploreDetailById = action.payload;
    });
    builder.addCase(getExploreDetailById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getExploreDetailByIdSlice.reducer;