import { Axios } from "@/Axios";

export const getUserTickets = () => {
  return Axios.get<Ticket[]>("/getTickets");
};
