import { createReducer } from "@reduxjs/toolkit";

import { LOGIN, login, getUser, GET_USER } from "@/redux/actions";

const initialState: {
  loading: boolean;
  error: Error | null;
  user: User | null;
  token: string | null;
} = {
  loading: false,
  error: null,
  user: null,
  token: null
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
        state.token = action.payload.token;
      }
    )
    .addCase(
      LOGIN.failure,
      (state, action: ReturnType<typeof login.failure>) => {
        state.loading = false;
        state.error = action.payload.error;
      }
    );
  builder.addCase(
    GET_USER.success,
    (state, action: ReturnType<typeof getUser.success>) => {
      state.user = action.payload.user;
    }
  );
});
