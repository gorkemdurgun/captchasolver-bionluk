import { call, delay, put, take } from "typed-redux-saga";

import { login as loginService } from "@/services/auth";
import { setToken } from "@/Axios";
import { login as loginAction } from "@/redux/actions";
import { toError } from "@/utils";

export function* login() {
  while (true) {
    try {
      const {
        payload: { email, password }
      } = yield* take(loginAction.request);

      console.log("email,pass-SAGA", email, password);

      const { data: response } = yield* call(loginService, email, password);

      setToken(response.token);

      yield* put(
        loginAction.success({
          user: response.user,
        })
      );
    } catch (error) {
      const e = toError(error);
      yield* put(loginAction.failure({ error: e }));
    }
  }
}
