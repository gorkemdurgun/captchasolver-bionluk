import { Axios } from "@/Axios";

type GetUserResponse = {
  status: boolean;
  user: User;
};

export const getUser = () => {
  return Axios.get<GetUserResponse>("/me");
};
