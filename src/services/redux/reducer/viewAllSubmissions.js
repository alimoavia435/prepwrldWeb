import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllSubmissions } from "../middleware/viewAllSubmisisons";

const initialState = {
  loading: false,
  error: "",
  getAllSubmissionsData : [],
};
const getAllSubmissionsSlice = createSlice({
  name: "getAllSubmissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSubmissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSubmissions.fulfilled, (state, action) => {
      state.loading = false;
      state.getAllSubmissions = action.payload;
    });
    builder.addCase(getAllSubmissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getAllSubmissionsSlice.reducer;