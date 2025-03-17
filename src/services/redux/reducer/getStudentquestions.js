import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudentquestions } from "../middleware/getStudentquestions";
const initialState = {
  loading: false,
  error: "",
  getStudentquestions: [],
};
const getStudentquestionsSlice = createSlice({
  name: "getAllrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentquestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentquestions.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getStudentquestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getStudentquestionsSlice.reducer;