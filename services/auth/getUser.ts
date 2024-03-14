import { Axios } from "@/Axios";

type GetUserResponse = User;

export const getUser = () => {
  return Axios.get<GetUserResponse>("/me");
};
