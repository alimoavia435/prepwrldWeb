import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getroomByid } from "../middleware/getroomByid"; 
const initialState = {
  loading: false,
  error: "",
  getroomByid: [],
};
const getroomByidSlice = createSlice({
  name: "getAllrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getroomByid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getroomByid.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getroomByid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getroomByidSlice.reducer;