import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    account: "",
    networkId: "",
  },
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setNetwork: (state, { payload }) => {
      state.networkId = payload;
    },
  },
});

export const { setAccount, setNetwork } = userSlice.actions;

export default userSlice.reducer;
