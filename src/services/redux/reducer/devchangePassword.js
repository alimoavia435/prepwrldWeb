import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { devchangePassword } from "../middleware/devchangePassword";

const initialState = {
  loading: false,
  error: "",
  devchangePassword: [],
};
const devchangePasswordSlice = createSlice({
  name: "devchangePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(devchangePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(devchangePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.devchangePassword = action.payload;
    });
    builder.addCase(devchangePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Something went wrong";
    });
  },
});
export default devchangePasswordSlice.reducer;