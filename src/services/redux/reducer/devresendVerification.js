import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { devresendVerification } from "../middleware/devresendVerification";

const initialState = {
  loading: false,
  error: "",
  devresendVerification: [],
};
const devresendVerificationSlice = createSlice({
  name: "resendVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(devresendVerification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(devresendVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.signup = action.payload;
    });
    builder.addCase(devresendVerification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default devresendVerificationSlice.reducer;