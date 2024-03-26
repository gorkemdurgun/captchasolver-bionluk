import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "./redux/store";
import { logout as logoutAction } from "./redux/actions";

export const Axios = axios.create({
  baseURL: "https://capsmasher.com/api/v1",
  timeout: 10000
  //FIXME: when file uploading, timeout is not enough
});

Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.timeout = 10000;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // if (response.data?.success === false) {
  //   throw new Error(response.data?.message || 'Something went wrong');
  // }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status === 401) {
    store.dispatch(logoutAction.request());
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

// REQUEST INTERCEPTOR
// Axios.interceptors.request.use(onRequest, onRequestError);

// RESPONSE INTERCEPTOR
Axios.interceptors.response.use(onResponse, onResponseError);

export function setToken(accessToken?: string) {
  if (accessToken) {
    Axios.defaults.headers.common.authorization = `Bearer ${accessToken}`;
  } else {
    delete Axios.defaults.headers.common.authorization;
  }
}
