import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAlldata } from "../middleware/getAlldata";
const initialState = {
    loading: false,
    error: "",
    getAlldata: [],
};
const getAlldataSlice = createSlice({
    name: "getAllrooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAlldata.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAlldata.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        });
        builder.addCase(getAlldata.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error || "something wrong";
        });
    },
});
export default getAlldataSlice.reducer;