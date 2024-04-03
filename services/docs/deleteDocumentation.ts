import { Axios } from "@/Axios";

export const deleteDocumentation = (id: string) => {
  return Axios.delete(`/deleteDocumentation/${id}`);
};
