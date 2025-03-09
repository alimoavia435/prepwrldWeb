import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changePassword } from "../middleware/changePassword";

const initialState = {
  loading: false,
  error: "",
  changePassword: [],
};
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.signup = action.payload;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default changePasswordSlice.reducer;