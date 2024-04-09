import { Axios } from "@/Axios";

type CreateOrderResponse = {
  productID: string;
  status: boolean;
};

export const createOrder = (amount: number) => {
  return Axios.post<CreateOrderResponse>("/orders/createOrder", { amount });
};
