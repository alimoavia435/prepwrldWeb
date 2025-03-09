import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getkyc } from "../middleware/getkyc";

const initialState = {
  loading: false,
  error: "",
  getkyc : [],
};
const getkycSlice = createSlice({
  name: "getkyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getkyc.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getkyc.fulfilled, (state, action) => {
      state.loading = false;
      state.getkyc = action.payload;
    });
    builder.addCase(getkyc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getkycSlice.reducer;