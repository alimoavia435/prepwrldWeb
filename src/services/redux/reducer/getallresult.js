import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getallresult } from "../middleware/getallresult";
const initialState = {
  loading: false,
  error: "",
  getallresult: [],
};
const getallresultSlice = createSlice({
  name: "getallresult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getallresult.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getallresult.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getallresult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getallresultSlice.reducer;