import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getcustomexams } from "../middleware/getcustomexams";

const initialState = {
  loading: false,
  error: "",
  getcustomexams: [],
};
const getcustomexamsSlice = createSlice({
  name: "getcustomexams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcustomexams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcustomexams.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getcustomexams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getcustomexamsSlice.reducer;