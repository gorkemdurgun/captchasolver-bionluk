import { Axios } from "@/Axios";

type RegisterResponse = {
  message: string;
};

export const register = (email: string, password: string) => {
  return Axios.post<RegisterResponse>("/register", {
    email,
    password
  });
};
