import { Axios } from "@/Axios";

type ResetKeyResponse = {
  clientKey: string;
};

export const resetClientKey = () => {
  return Axios.post<ResetKeyResponse>("/users/resetKey");
};
