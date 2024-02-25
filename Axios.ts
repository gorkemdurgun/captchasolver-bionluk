import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://capsmasher.com/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export const setToken = (token: string) => {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  delete Axios.defaults.headers.common.Authorization;
};

export default Axios;
