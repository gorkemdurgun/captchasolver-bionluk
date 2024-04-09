import { Axios } from "@/Axios";

type GetBlogsResponse = {
  status: boolean;
  blogs: Blog[];
};

export const getBlogs = () => {
  return Axios.get<GetBlogsResponse>("/getBlogs").then(({ data }) => {
    return data.blogs;
  });
};
