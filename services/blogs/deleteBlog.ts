import { Axios } from "@/Axios";

export const deleteBlog = (id: string) => {
  return Axios.delete("/deleteBlog", { params: { id } });
};
