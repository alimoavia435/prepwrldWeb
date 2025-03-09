import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { devGetProjectByID } from "../middleware/devAddProperty";

const initialState = {
  loading: false,
  error: "",
  devGetProjectByIdData: [],
};
const devGetProjectByIDSlice = createSlice({
  name: "devGetProjectByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(devGetProjectByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(devGetProjectByID.fulfilled, (state, action) => {
      state.loading = false;
      state.devGetProjectByIdData = action.payload;
    });
    builder.addCase(devGetProjectByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default devGetProjectByIDSlice.reducer;
