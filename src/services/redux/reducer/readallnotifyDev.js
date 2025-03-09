import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readallnotifyDev } from "../middleware/readallnotifyDev";
const initialState = {
  loading: false,
  error: "",
  readallnotifyDev: [],
};
const readallnotifyDevSlice = createSlice({
  name: "readallnotifyDev",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readallnotifyDev.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readallnotifyDev.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(readallnotifyDev.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default readallnotifyDevSlice.reducer;