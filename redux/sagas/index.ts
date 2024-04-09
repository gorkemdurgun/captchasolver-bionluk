import { all, fork } from "typed-redux-saga";

import {
  loginSaga,
  logoutSaga,
  registerSaga,
  getUserSaga,
  resetClientKeySaga
} from "./auth";

export default function* root() {
  yield* all([
    fork(loginSaga),
    fork(logoutSaga),
    fork(registerSaga),
    fork(getUserSaga),
    fork(resetClientKeySaga)
  ]);
}
