import { Axios } from "@/Axios";

type TicketStatus = "pending" | "closed";

export const editTicketStatus = (ticketId: number, status: TicketStatus) => {
  return Axios.post("/editTicketStatus", {
    id: ticketId,
    status
  });
};
