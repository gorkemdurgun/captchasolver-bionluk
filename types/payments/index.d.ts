type Pricing = {
  id: number;
  title: string;
  logo: string;
  speed: number;
  pricePerThousandRequest: number;
};

type Payment = {
  id: number;
  uniqId: string;
  total: number;
  customerID: string;
  customer_email: string;
  created_at: number;
};
