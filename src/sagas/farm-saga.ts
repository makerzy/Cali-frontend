import {
  setFarms,
  setFarmUser,
  setLoading,
  setUserDataLoaded,
} from "features/farm/FarmSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchFarm, fetchFarmUser } from "states/cali-farm";
import { FETCH_FARM } from "./types";

function* fetchFarms(action: any) {
  yield put(setLoading(true));
  const data: [] = yield call(fetchFarm);
  if (data) {
    yield put(setFarms(data));
    yield put(setLoading(false));
    console.log("Type and payload: ", data);
    if (action?.payload) {
      const userData: [] = yield call(fetchFarmUser, action?.payload?.account);
      console.log(action?.payload, userData);
      if (userData) {
        yield put(setFarmUser(userData));
        yield put(setUserDataLoaded(true));
      }
    }
  } else {
    alert("error");
    yield put(setLoading(false));
  }
}

// use them in parallel
export default function* farmSaga() {
  yield takeLatest(FETCH_FARM, fetchFarms);
}
