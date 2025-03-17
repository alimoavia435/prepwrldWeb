import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getexamdetail } from "../middleware/getexamdetail";
const initialState = {
    loading: false,
    error: "",
    getexams: [],
};
const getexamdetailSlice = createSlice({
    name: "getexams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getexamdetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getexamdetail.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getexamdetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error || "something wrong";
        });
    },
});
export default getexamdetailSlice.reducer;