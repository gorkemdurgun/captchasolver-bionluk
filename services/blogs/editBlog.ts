import { Axios } from "@/Axios";

export const editBlog = (blog: Blog) => {
  return Axios.put("/editBlog", blog);
};
