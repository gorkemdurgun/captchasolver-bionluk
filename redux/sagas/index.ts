import { all, fork } from "typed-redux-saga";

import { loginSaga, getUserSaga } from "./auth";

export default function* root() {
  yield* all([fork(loginSaga), fork(getUserSaga)]);
}
