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
  request: createAction<{ email: string; password: string }>(LOGIN.request),
  success: createAction<{ user: User }>(LOGIN.success),
  failure: createAction<{ error: Error }>(LOGIN.failure)
};
