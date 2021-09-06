/* eslint-disable require-yield */
import { all, fork } from "redux-saga/effects";
import * as userAccountSaga from "./user-saga";
import * as farmSaga from "./farm-saga";
// use them in parallel
export default function* rootSaga() {
  yield all(
    [...Object.values(userAccountSaga), ...Object.values(farmSaga)].map(fork),
  );
}
