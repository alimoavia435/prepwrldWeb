import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getdevnotification } from "../middleware/getdevnotification";
const initialState = {
  loading: false,
  error: "",
  getdevnotification: [],
};
const getdevnotificationSlice = createSlice({
  name: "getinvesnotificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getdevnotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getdevnotification.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getdevnotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getdevnotificationSlice.reducer;