import { createAction } from "@reduxjs/toolkit";

type ActionType = "REQUEST" | "SUCCESS" | "FAILURE";

const createAsyncAction = (type: string) => {
  const asyncType = (actionType: ActionType) => `${type}_${actionType}`;
  return {
    request: asyncType("REQUEST"),
    success: asyncType("SUCCESS"),
    failure: asyncType("FAILURE")
  };
};

export const AUTH_CLEAR_LOADINGS_AND_ERRORS = createAsyncAction(
  "AUTH_CLEAR_LOADINGS_AND_ERRORS"
);
export const authClearLoadingsAndErrors = {
  request: createAction(AUTH_CLEAR_LOADINGS_AND_ERRORS.request)
};

export const LOGIN = createAsyncAction("LOGIN");
export const login = {
  request: createAction<{
    email: string;
    password: string;
    onSuccess?: () => void;
  }>(LOGIN.request),
  success: createAction<{ token: string }>(LOGIN.success),
  failure: createAction<{ errorMessage: string }>(LOGIN.failure)
};

export const LOGOUT = createAsyncAction("LOGOUT");
export const logout = {
  request: createAction(LOGOUT.request),
  success: createAction(LOGOUT.success),
  failure: createAction<{ errorMessage: string }>(LOGOUT.failure)
};

export const REGISTER = createAsyncAction("REGISTER");
export const register = {
  request: createAction<{
    email: string;
    password: string;
    onSuccess?: () => void;
  }>(REGISTER.request),
  success: createAction(REGISTER.success),
  failure: createAction<{ errorMessage: string }>(REGISTER.failure)
};

export const GET_USER = createAsyncAction("GET_USER");
export const getUser = {
  request: createAction(GET_USER.request),
  success: createAction<{ user: User }>(GET_USER.success),
  failure: createAction<{ errorMessage: string }>(GET_USER.failure)
};
