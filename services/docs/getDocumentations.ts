import { Axios } from "@/Axios";

export const getDocumentations = () => {
  return Axios.get<Documentation[]>("/getDocumentations");
};
