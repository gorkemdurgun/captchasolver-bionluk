import { Axios } from "@/Axios";

export const addMessageToTicket = (id: number, message: string) => {
  return Axios.post("/addMessageToTicket", {
    id,
    message
  });
};
