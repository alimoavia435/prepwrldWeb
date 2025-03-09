import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { featuredProp } from "../middleware/featuredProp";

const initialState = {
  loading: false,
  error: "",
  featuredProp: [],
};
const featuredPropSlice = createSlice({
  name: "featuredProp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(featuredProp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(featuredProp.fulfilled, (state, action) => {
      state.loading = false;
      state.featuredProp = action.payload;
    });
    builder.addCase(featuredProp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default featuredPropSlice.reducer;
