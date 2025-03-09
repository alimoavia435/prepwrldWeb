import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { kycDataDev } from "../middleware/kycDataDev";

const initialState = {
    loading: false,
    error: "",
    kycDataDev: [],
};
const kycDataDevSlice = createSlice({
    name: "kycDataDev",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(kycDataDev.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(kycDataDev.fulfilled, (state, action) => {
            state.loading = false;
            state.kycDataDev = action.payload;
        });
        builder.addCase(kycDataDev.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default kycDataDevSlice.reducer;