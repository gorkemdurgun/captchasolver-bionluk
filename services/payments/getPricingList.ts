import { Axios } from "@/Axios";

type GetPricingListResponse = {
  status: boolean;
  pricings: Pricing[];
};

export const getPricingList = () => {
  return Axios.get<GetPricingListResponse>("/getPricings");
};
