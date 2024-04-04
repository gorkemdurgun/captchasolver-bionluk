import { Axios } from "@/Axios";

export const getAllTickets = () => {
  return Axios.get<Ticket[]>("/getAllTickets");
};
