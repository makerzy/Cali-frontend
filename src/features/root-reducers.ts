import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
export const rootReducers = combineReducers({ user: userReducer });

export type RootState = ReturnType<typeof rootReducers>;
