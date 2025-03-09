import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readallNotification } from "../middleware/readallNotification"; 
const initialState = {
  loading: false,
  error: "",
  readallNotification: [],
};
const readallNotificationSlice = createSlice({
  name: "getinvesnotificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readallNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readallNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(readallNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default readallNotificationSlice.reducer;