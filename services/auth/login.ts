import { Axios } from "@/Axios";

type LoginResponse = {
  accessToken: string;
};

export const login = (email: string, password: string) => {
  return Axios.post<LoginResponse>("/login", {
    email,
    password
  });
};
