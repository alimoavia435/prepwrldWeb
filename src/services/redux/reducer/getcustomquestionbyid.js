import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getcustomquestionbyid } from "../middleware/getcustomquestionbyid";
const initialState = {
    loading: false,
    error: "",
    getcustomquestionbyid: [],
};
const getcustomquestionbyidSlice = createSlice({
    name: "getexams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getcustomquestionbyid.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getcustomquestionbyid.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getcustomquestionbyid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error || "something wrong";
        });
    },
});
export default getcustomquestionbyidSlice.reducer;