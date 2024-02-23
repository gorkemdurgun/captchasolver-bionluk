import { createReducer } from "@reduxjs/toolkit";

import { LOGIN, login } from "@/redux/actions";

const initialState: {
  loading: boolean;
  error: Error | null;
  user: User | null;
} = {
  loading: false,
  error: null,
  user: null
};

export const authReducer = createReducer(initialState, builder => {
  builder
    .addCase(LOGIN.request, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      LOGIN.success,
      (state, action: ReturnType<typeof login.success>) => {
        state.loading = false;
        state.user = action.payload.user;
      }
    )
    .addCase(LOGIN.failure, (state, action: ReturnType<typeof login.failure>) => {
      state.loading = false;
      state.error = action.payload.error;
    });
});
