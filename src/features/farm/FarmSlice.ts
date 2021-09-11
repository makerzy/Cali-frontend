import { createSlice } from "@reduxjs/toolkit";
import { Farm, FarmState } from "states/types";

const noAccountFarmConfig: Farm = {
  caliBusdPrice: "0",
  caliLpBusd: "0",
  totalPoolValueBusd: "0",
  user: null,
};

const initialState: FarmState = {
  loading: true,
  data: noAccountFarmConfig,
  userDataLoaded: false,
};
const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    setFarms: (state, { payload }) => {
      state.data = payload;
    },
    setLoading: (state, { payload }) => void (state.loading = payload),
    setFarmUser: (state, { payload }) => {
      state.data = { ...state.data, user: payload };
      // console.log("Full PayLoad: ", state.data);
    },
    setUserDataLoaded: (state, { payload }) =>
      void (state.userDataLoaded = payload),
  },
});

export const { setFarms, setLoading, setFarmUser, setUserDataLoaded } =
  farmSlice.actions;

export default farmSlice.reducer;
