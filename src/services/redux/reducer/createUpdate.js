// createUpdate.js

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUpdate } from "../middleware/createUpdate";

const initialState = {
  loading: false,
  error: "",
  createUpdate: [],
};
const developerAllProjectsSlice = createSlice({
  name: "createUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.createUpdate = action.payload;
    });
    builder.addCase(createUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default developerAllProjectsSlice.reducer;
