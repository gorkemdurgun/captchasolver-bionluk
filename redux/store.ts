import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/reducers/auth/authReducer";

import createSagaMiddleware from "redux-saga";
import rootSaga from "@/redux/sagas";
import {
  createMigrate,
  persistReducer,
  persistStore,
  persistCombineReducers,
  PersistConfig
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
// import Router from "next/navigation";
import { authClearLoadingsAndErrors } from "./actions";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
  version: 1
};

const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
});

export const persistor = persistStore(store, {}, () => {
  store.dispatch(authClearLoadingsAndErrors.request());
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
