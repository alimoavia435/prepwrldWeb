import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { devVerifyEmail } from "../middleware/devVerifyEmail";

const initialState = {
    loading: false,
    error: "",
    devVerifyEmail: [],
};
const devVerifyEmailSlice = createSlice({
    name: "devVerifyEmail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(devVerifyEmail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(devVerifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.devVerifyEmail = action.payload;
        });
        builder.addCase(devVerifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default devVerifyEmailSlice.reducer;