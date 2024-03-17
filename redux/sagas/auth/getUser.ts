import { call, delay, put, take } from "typed-redux-saga";

import { getUser as getUserAction } from "@/redux/actions";
import { toError } from "@/utils";
import { getUserService } from "@/services/auth";

export function* getUser() {
  while (true) {
    try {
      yield* take(getUserAction.request);

      const { data: response } = yield* call(getUserService);

      yield* put(getUserAction.success({ user: response }));
    } catch (error) {
      const e = toError(error);
      yield* put(getUserAction.failure({ errorMessage: e.message }));
    }
  }
}
