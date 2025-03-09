import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDevLiveProjects } from "../middleware/devAddProperty";

const initialState = {
  loading: false,
  error: "",
  getDevLiveProjectslData: [],
};
const getDevLiveProjectsSlice = createSlice({
  name: "getDevLiveProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevLiveProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDevLiveProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.getDevLiveProjectslData = action.payload;
    });
    builder.addCase(getDevLiveProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getDevLiveProjectsSlice.reducer;
