/* eslint-disable require-yield */
import { takeEvery, put } from "redux-saga/effects";

import { setAccount, setNetwork } from "features/user/UserSlice";

function* setNetworks(action: any) {
  yield put(setNetwork(action.payload));
}

function* setAccounts(action: any) {
  yield put(setAccount(action.payload));
}

// use them in parallel
export default function* userAccountSaga() {
  yield takeEvery("SET_ACCOUNT", setAccounts);
  yield takeEvery("SET_NETWORK", setNetworks);
}
