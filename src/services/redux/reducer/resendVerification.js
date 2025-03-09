import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendVerification } from "../middleware/resendVerification";

const initialState = {
  loading: false,
  error: "",
  resendVerification: [],
};
const resendVerificationSlice = createSlice({
  name: "resendVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resendVerification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resendVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.signup = action.payload;
    });
    builder.addCase(resendVerification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default resendVerificationSlice.reducer;