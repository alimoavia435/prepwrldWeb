import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { investorImageUpload } from "../middleware/investorImageUpload";

const initialState = {
    loading: false,
    error: "",
    investorImageUpload: [],
};
const investorImageUploadSlice = createSlice({
    name: "investorProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(investorImageUpload.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(investorImageUpload.fulfilled, (state, action) => {
            state.loading = false;
            state.investorImageUpload = action.payload;
        });
        builder.addCase(investorImageUpload.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default investorImageUploadSlice.reducer;