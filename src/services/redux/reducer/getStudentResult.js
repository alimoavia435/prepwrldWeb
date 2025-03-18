import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudentResult } from "../middleware/getStudentResult";
const initialState = {
    loading: false,
    error: "",
    getStudentResult: [],
};
const getStudentResultSlice = createSlice({
    name: "getStudentResult",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStudentResult.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStudentResult.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getStudentResult.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error || "something wrong";
        });
    },
});
export default getStudentResultSlice.reducer;