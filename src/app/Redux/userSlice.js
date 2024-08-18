import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    premium: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload;
    },
    updatePremium: (state, action) => {
      state.premium = action.payload;
    },
  },
});
export const { updateUser, updatePremium } = userSlice.actions;
export default userSlice.reducer;
