import { createReducer } from "@reduxjs/toolkit";

import {
  authClearLoadingsAndErrors,
  LOGIN,
  login,
  logout,
  LOGOUT,
  getUser,
  GET_USER,
  register,
  REGISTER
} from "@/redux/actions";

const initialState: {
  loading: boolean;
  errorMessage: string | null;
  user: User | null;
  token: string | null;
} = {
  loading: false,
  errorMessage: null,
  user: null,
  token: null
};

export const authReducer = createReducer(initialState, builder => {
  // Clear loadings and errors
  builder.addCase(authClearLoadingsAndErrors.request, state => {
    state.loading = false;
    state.errorMessage = null;
  });
  // Login
  builder
    .addCase(LOGIN.request, state => {
      state.loading = true;
      state.errorMessage = null;
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
        state.errorMessage = action.payload.errorMessage;
      }
    );
  // Logout
  builder.addCase(LOGOUT.request, state => {
    state.token = null;
    state.user = null;
  });
  // Register
  builder
    .addCase(REGISTER.request, state => {
      state.loading = true;
      state.errorMessage = null;
    })
    .addCase(
      REGISTER.success,
      (state, action: ReturnType<typeof register.success>) => {
        state.loading = false;
      }
    )
    .addCase(
      REGISTER.failure,
      (state, action: ReturnType<typeof register.failure>) => {
        state.loading = false;
        state.errorMessage = action.payload.errorMessage;
      }
    );
  // Get user
  builder.addCase(
    GET_USER.success,
    (state, action: ReturnType<typeof getUser.success>) => {
      state.user = action.payload.user;
    }
  );
});
