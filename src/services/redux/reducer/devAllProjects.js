import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { developerAllProjects } from "../middleware/devAddProperty";

const initialState = {
  loading: false,
  error: "",
  developerAllProjectslData: [],
};
const developerAllProjectsSlice = createSlice({
  name: "developerAllSubmissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(developerAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(developerAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.developerAllProjectslData = action.payload;
    });
    builder.addCase(developerAllProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default developerAllProjectsSlice.reducer;
