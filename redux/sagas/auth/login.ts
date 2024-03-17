import { call, delay, put, take } from "typed-redux-saga";

import { loginService } from "@/services/auth";
import { setToken } from "@/Axios";
import {
  login as loginAction,
  getUser as getUserAction
} from "@/redux/actions";
import { toError } from "@/utils";
import { errorToast, successToast } from "@/components/toaster";

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

      successToast("You have successfully logged in!");

      if (onSuccess) {
        onSuccess();
      }

      yield* put(getUserAction.request());
    } catch (error: any) {
      const errorMessage = error.response.data.errorDescription as string;
      errorToast(errorMessage);
      yield* put(loginAction.failure({ errorMessage: errorMessage }));
    }
  }
}
