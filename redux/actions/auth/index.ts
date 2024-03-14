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

export const LOGIN = createAsyncAction("LOGIN");
export const login = {
  request: createAction<{
    email: string;
    password: string;
    onSuccess?: () => void;
  }>(LOGIN.request),
  success: createAction<{ token: string }>(LOGIN.success),
  failure: createAction<{ error: Error }>(LOGIN.failure)
};

export const GET_USER = createAsyncAction("GET_USER");
export const getUser = {
  request: createAction(GET_USER.request),
  success: createAction<{ user: User }>(GET_USER.success),
  failure: createAction<{ error: Error }>(GET_USER.failure)
};
