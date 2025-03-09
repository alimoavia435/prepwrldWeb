import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { purchaseProperty } from "../middleware/purchaseProperty";

const initialState = {
    loading: false,
    error: "",
    purchaseProperty: [],
};
const purchasePropertySlice = createSlice({
    name: "purchaseProperty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(purchaseProperty.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(purchaseProperty.fulfilled, (state, action) => {
            state.loading = false;
            state.propertyDeveloperProfile = action.payload;
        });
        builder.addCase(purchaseProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || "Something went wrong";
        });
    },
});
export default purchasePropertySlice.reducer;