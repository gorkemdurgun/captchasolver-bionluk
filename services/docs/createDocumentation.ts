import { Axios } from "@/Axios";

export const createDocumentation = () => {
  return Axios.post<Documentation>("/createDocumentation", {
    title: "New Documentation",
    subItems: [
      {
        title: "New Sub Item",
        content: "New Sub Item Content"
      }
    ]
  });
};
