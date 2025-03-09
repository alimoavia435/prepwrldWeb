import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { devforgetPassword } from "../middleware/devforgetPassword";

const initialState = {
  loading: false,
  error: "",
  devforgetPassword: [],
};

const devforgetPasswordSlice = createSlice({
  name: "devforgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(devforgetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(devforgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.devforgetPassword = action.payload;
    });
    builder.addCase(devforgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default devforgetPasswordSlice.reducer;