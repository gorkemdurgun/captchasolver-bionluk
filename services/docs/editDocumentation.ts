import { Axios } from "@/Axios";

export const editDocumentation = (documentation: Documentation) => {
  return Axios.put<Documentation>("/editDocumentation", documentation);
};
