import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudentExams } from "../middleware/getStudentExams"; 
const initialState = {
  loading: false,
  error: "",
  getroomByid: [],
};
const getStudentExamsSlice = createSlice({
  name: "getAllrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentExams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentExams.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getStudentExams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getStudentExamsSlice.reducer;