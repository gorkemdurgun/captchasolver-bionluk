import { Axios } from "@/Axios";

export const getContactForms = () => {
  return Axios.get("/getContactForms");
};
