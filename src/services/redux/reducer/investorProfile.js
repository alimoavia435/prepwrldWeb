import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { investorProfile } from "../middleware/investorProfile";

const initialState = {
    loading: false,
    error: "",
    investorProfile: [],
};
const investorProfileSlice = createSlice({
    name: "investorProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(investorProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(investorProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.investorProfile = action.payload;
        });
        builder.addCase(investorProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default investorProfileSlice.reducer;