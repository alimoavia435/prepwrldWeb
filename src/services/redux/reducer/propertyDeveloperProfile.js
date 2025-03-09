import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { investorProfile } from "../middleware/investorProfile";
import { propertyDeveloperProfile } from "../middleware/propertyDeveloperProfile";

const initialState = {
    loading: false,
    error: "",
    developerProfile: [],
};
const propertyDeveloperProfileSlice = createSlice({
    name: "propertyDeveloperProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(propertyDeveloperProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(propertyDeveloperProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.propertyDeveloperProfile = action.payload;
        });
        builder.addCase(propertyDeveloperProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default propertyDeveloperProfileSlice.reducer;