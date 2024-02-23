import { all, fork } from "typed-redux-saga";

import { login } from "./auth/login";

export default function* root() {
  yield* all([fork(login)]);
}
