import { call, delay, put, take } from "typed-redux-saga";

import { loginService, registerService } from "@/services/auth";
import { setToken } from "@/Axios";
import {
  register as registerAction,
  login as loginAction
} from "@/redux/actions";
import { errorToast, loadingToast, successToast, toastController } from "@/components/toaster";

export function* register() {
  while (true) {
    try {
      const {
        payload: { email, password, onSuccess }
      } = yield* take(registerAction.request);
      const loading = loadingToast();

      const { data: response } = yield* call(registerService, email, password);

      yield* put(registerAction.success);

      toastController.remove(loading);
      successToast("You have successfully registered!");

      yield* put(loginAction.request({ email, password }));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response.data.errorDescription as string;

      toastController.dismiss();
      errorToast(errorMessage);
      yield* put(registerAction.failure({ errorMessage: errorMessage }));
    }
  }
}
