import { call, delay, put, take } from "typed-redux-saga";

import { addCredit as addCreditAction } from "@/redux/actions";
import { toError } from "@/utils";
import {
  createOrder as createOrderService,
  getSellixUrl as getSellixUrlService
} from "@/services/payments";

export function* addCredit() {
  while (true) {
    try {
      const {
        payload: { amount }
      } = yield* take(addCreditAction.request);

      const { data: response } = yield* call(createOrderService, amount);

      const { data: sellix } = yield* call(
        getSellixUrlService,
        response.productID
      );

      window.location.href = sellix.sellixUrl;

      yield* put(addCreditAction.success());
    } catch (error) {
      const e = toError(error);
      yield* put(addCreditAction.failure({ errorMessage: e.message }));
    }
  }
}
