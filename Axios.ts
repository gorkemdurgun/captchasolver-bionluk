import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const setToken = (token: string) => {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  delete Axios.defaults.headers.common.Authorization;
};

export default Axios;