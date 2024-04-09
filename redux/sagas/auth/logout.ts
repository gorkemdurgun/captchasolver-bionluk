import { call, delay, put, take } from "typed-redux-saga";

import { loginService } from "@/services/auth";
import { setToken } from "@/Axios";
import { logout as logoutAction } from "@/redux/actions";
import { toError } from "@/utils";
import {
  errorToast,
  loadingToast,
  successToast,
  toastController
} from "@/components/toaster";

export function* logout() {
  while (true) {
    try {
      const {} = yield* take(logoutAction.request);

      localStorage.removeItem("accessToken");

      yield* put(logoutAction.success());
    } catch (error: any) {
      const errorMessage = error.response.data.errorDescription as string;

      toastController.dismiss();
      errorToast(errorMessage);

      yield* put(logoutAction.failure({ errorMessage: errorMessage }));
    }
  }
}
