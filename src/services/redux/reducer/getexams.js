import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getexams } from "../middleware/getexams";
const initialState = {
  loading: false,
  error: "",
  getexams: [],
};
const getexamsSlice = createSlice({
  name: "getexams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getexams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getexams.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getexams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getexamsSlice.reducer;