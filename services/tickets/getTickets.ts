import { Axios } from "@/Axios";

export const getTickets = () => {
  return Axios.get<Ticket[]>("/getTicket");
};
