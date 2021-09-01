/* eslint-disable require-yield */
import { all, fork } from "redux-saga/effects";
import * as userAccountSaga from "./user-saga";
// use them in parallel
export default function* rootSaga() {
  yield all([...Object.values(userAccountSaga)].map(fork));
}
