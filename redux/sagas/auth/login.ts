import { call, delay, put, take } from "typed-redux-saga";

import { loginService } from "@/services/auth";
import { setToken } from "@/Axios";
import {
  login as loginAction,
  getUser as getUserAction
} from "@/redux/actions";
import { toError } from "@/utils";

export function* login() {
  while (true) {
    try {
      const {
        payload: { email, password, onSuccess }
      } = yield* take(loginAction.request);

      const { data: response } = yield* call(loginService, email, password);

      setToken(response.accessToken);

      yield* put(
        loginAction.success({
          token: response.accessToken
        })
      );

      yield* delay(1000);

      if (onSuccess) {
        onSuccess();
      }

      yield* put(getUserAction.request());
    } catch (error) {
      const e = toError(error);
      yield* put(loginAction.failure({ error: e }));
    }
  }
}
