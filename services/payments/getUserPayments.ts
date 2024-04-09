import { Axios } from "@/Axios";

type GetUserPaymentsResponse = {
  status: boolean;
  payments: Payment[];
};

export const getUserPayments = () => {
  return Axios.get<GetUserPaymentsResponse>("/payments/getPayments");
};
