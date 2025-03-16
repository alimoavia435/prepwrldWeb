import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllrooms } from "../middleware/getAllrooms";
const initialState = {
  loading: false,
  error: "",
  getAllrooms: [],
};
const getAllroomsSlice = createSlice({
  name: "getAllrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllrooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllrooms.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getAllrooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getAllroomsSlice.reducer;