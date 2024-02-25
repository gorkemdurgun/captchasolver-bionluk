import Axios from "@/Axios";

type LoginResponse = {
  token: string;
  user: User;
};

export const login = (email: string, password: string) => {
  return Axios.post<LoginResponse>("/login", {
    email,
    password
  });
};
