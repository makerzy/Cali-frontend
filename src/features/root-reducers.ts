import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import farmReducer from "./farm/FarmSlice";
export const rootReducers = combineReducers({
  user: userReducer,
  farm: farmReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
