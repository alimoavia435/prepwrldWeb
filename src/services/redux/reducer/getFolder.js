import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFolder } from "../middleware/getFolder";
const initialState = {
  loading: false,
  error: "",
  getFolder: [],
};
const getFolderSlice = createSlice({
  name: "getFolder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFolder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFolder.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getFolder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getFolderSlice.reducer;