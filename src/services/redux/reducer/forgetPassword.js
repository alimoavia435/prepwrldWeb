import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forgetPassword } from "../middleware/forgetPassword";

const initialState = {
  loading: false,
  error: "",
  forgetPassword: [],
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.signup = action.payload;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default forgetPasswordSlice.reducer;