import createSagaMiddleware from "redux-saga";
import { rootReducers } from "features/root-reducers";
import rootSaga from "sagas/root-saga";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
const sagaMiddleware = createSagaMiddleware();
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducers,
  middleware: [...customizedMiddleware, ...middlewares],
});

sagaMiddleware.run(rootSaga);

export default store;
