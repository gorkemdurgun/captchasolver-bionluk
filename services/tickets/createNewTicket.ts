import { Axios } from "@/Axios";

export const createNewTicket = (ticket: {
  subject: string;
  message: string;
}) => {
  return Axios.post("/createTicket", ticket);
};
