import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { portfoliomanagement } from "../middleware/portfoliomanagement";

const initialState = {
    loading: false,
    error: "",
    portfoliomanagement: [],
};
const portfoliomanagementSlice = createSlice({
    name: "portfoliomanagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(portfoliomanagement.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(portfoliomanagement.fulfilled, (state, action) => {
            state.loading = false;
            state.portfoliomanagement = action.payload;
        });
        builder.addCase(portfoliomanagement.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default portfoliomanagementSlice.reducer;