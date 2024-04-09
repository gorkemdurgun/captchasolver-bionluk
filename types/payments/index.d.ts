type Pricing = {
  id: number;
  title: string;
  logo: string;
  speed: number;
  pricePerThousandRequest: number;
};

type Payment = {
  id: number;
  total: number;
  customerId: number;
  customerEmail: string;
  createdTimestamp: number;
};
