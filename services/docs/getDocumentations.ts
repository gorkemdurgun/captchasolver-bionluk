import { Axios } from "@/Axios";

type GetDocumentationsResponse = {
  status: boolean;
  documentations: Documentation[];
};

export const getDocumentations = () => {
  return Axios.get<GetDocumentationsResponse>("/getDocumentations");
};
