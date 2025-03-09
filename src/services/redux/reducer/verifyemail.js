import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyemail } from "../middleware/forgetPassword";

const initialState = {
    loading: false,
    error: "",
    verifyemail: [],
};
const verifyemailSlice = createSlice({
    name: "verifyemail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(verifyemail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyemail.fulfilled, (state, action) => {
            state.loading = false;
            state.signup = action.payload;
        });
        builder.addCase(verifyemail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default verifyemailSlice.reducer;