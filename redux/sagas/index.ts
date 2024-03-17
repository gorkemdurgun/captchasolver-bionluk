import { all, fork } from "typed-redux-saga";

import { loginSaga, registerSaga, getUserSaga } from "./auth";

export default function* root() {
  yield* all([fork(loginSaga), fork(registerSaga), fork(getUserSaga)]);
}
