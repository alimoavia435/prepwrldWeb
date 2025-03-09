import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDevPropertyDetailById } from "../middleware/getDevPropertyDetails";

const initialState = {
  loading: false,
  error: "",
  getDevPropertyDetailByIdData: [],
};
const getDevPropertyDetailByIdSlice = createSlice({
  name: "getDevPropertyDetailById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevPropertyDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDevPropertyDetailById.fulfilled, (state, action) => {
      state.loading = false;
      state.getDevPropertyDetailByIdData = action.payload;
    });
    builder.addCase(getDevPropertyDetailById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getDevPropertyDetailByIdSlice.reducer;