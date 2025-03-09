import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getinvesnotification } from "../middleware/getinvesnotification";
const initialState = {
  loading: false,
  error: "",
  getinvesnotification: [],
};
const getinvesnotificationSlice = createSlice({
  name: "getinvesnotificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getinvesnotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getinvesnotification.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getinvesnotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getinvesnotificationSlice.reducer;