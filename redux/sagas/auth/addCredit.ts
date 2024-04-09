import { call, delay, put, take } from "typed-redux-saga";

import { addCredit as addCreditAction } from "@/redux/actions";
import { toError } from "@/utils";
import {
  createOrder as createOrderService,
  getSellixUrl as getSellixUrlService
} from "@/services/payments";
import { loadingToast, successToast, toastController } from "@/components/toaster";

export function* addCredit() {
  while (true) {
    try {
      const {
        payload: { amount }
      } = yield* take(addCreditAction.request);
      const loading = loadingToast();

      const { data: response } = yield* call(createOrderService, amount);

      const { data: sellix } = yield* call(
        getSellixUrlService,
        response.productID
      );

      toastController.remove(loading);
      successToast("You will be redirected to the payment page!");
      setTimeout(() => {
        window.location.href = sellix.sellixUrl;
      }, 2000);

      yield* put(addCreditAction.success());
    } catch (error) {
      const e = toError(error);
      yield* put(addCreditAction.failure({ errorMessage: e.message }));
    }
  }
}
