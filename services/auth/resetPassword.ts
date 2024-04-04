import { Axios } from "@/Axios";

export const resetPassword = (oldPassword: string, newPassword: string) => {
  return Axios.post("/users/resetPassword", {
    oldPassword,
    password: newPassword
  });
};
