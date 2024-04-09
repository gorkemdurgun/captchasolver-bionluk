import { Axios } from "@/Axios";

type GetSellixUrlResponse = {
  sellixUrl: string;
  status: boolean;
};

export const getSellixUrl = (productID: string) => {
  return Axios.post<GetSellixUrlResponse>("/orders/getSellixUrl", {
    productID
  });
};
