import { Axios } from "@/Axios";

type GetUserTicketsResponse = {
  status: boolean;
  tickets: Ticket[];
};

export const getUserTickets = () => {
  return Axios.get<GetUserTicketsResponse>("/getTickets");
};
