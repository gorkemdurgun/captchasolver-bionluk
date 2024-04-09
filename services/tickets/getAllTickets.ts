import { Axios } from "@/Axios";

type GetAllTicketsResponse = {
  status: boolean;
  tickets: Ticket[];
};

export const getAllTickets = () => {
  return Axios.get<GetAllTicketsResponse>("/getAllTickets");
};
