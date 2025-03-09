import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  logout: false,
};
export const logoutSlice = createSlice({
  name: 'logoutSlice',
  initialState,
  reducers: {
    logoutFun: (state, action) => {
      state.logout = action.payload; // Use action.payload to get the value passed with the action
    },
  },
});
// Action creators are generated for each case reducer function
export const { logoutFun } = logoutSlice.actions;
export default logoutSlice.reducer;