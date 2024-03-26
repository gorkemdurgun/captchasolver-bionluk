import { call, delay, put, take } from "typed-redux-saga";

import { resetClientKey as resetClientKeyAction } from "@/redux/actions";
import { toError } from "@/utils";
import { resetClientKeyService } from "@/services/auth";

export function* resetClientKey() {
  while (true) {
    try {
      yield* take(resetClientKeyAction.request);

      const { data: response } = yield* call(resetClientKeyService);

      yield* put(
        resetClientKeyAction.success({ clientKey: response.clientKey })
      );
    } catch (error) {
      const e = toError(error);
      yield* put(resetClientKeyAction.failure({ errorMessage: e.message }));
    }
  }
}
