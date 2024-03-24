import { Button, Card, Divider } from "@nextui-org/react";
import Text from "../text";
import PricingSectionLayout from "./layout";

import { PiDotDuotone as PiMatterIcon } from "react-icons/pi";

const pricingPlans = [
  {
    title: "BASIC",
    price: 10,
    features: [
      "1000 requests",
      "1 month support",
      "1 month updates",
      "Email support"
    ]
  },
  {
    title: "STANDARD",
    price: 20,
    features: [
      "2000 requests",
      "3 months support",
      "3 months updates",
      "Email support",
      "Ticket support"
    ]
  },
  {
    title: "PREMIUM",
    price: 30,
    features: [
      "5000 requests",
      "6 months support",
      "6 months updates",
      "Email support",
      "Ticket support",
      "Free consultation",
      "Access to beta features"
    ]
  }
];

export const PricingSection = () => {
  return (
    <PricingSectionLayout>
      <div
        id="landing-pricing-section"
        className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10"
      >
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <Text className="text-major text-black text-3xl md:text-5xl">
            PRICING PLANS
          </Text>
        </span>
        <Text className="text-body text-black text-md text-center lg:text-xl">
          Choose the right plan for your needs. We offer different plans to
          match your requirements. You can also contact us for custom plans. If
          have any questions, feel free to contact us. We are here to help you.
          We also offer a 30-day money-back guarantee.
        </Text>
        <Divider className="w-full my-4" />
        <div className="grid grid-cols-1 w-full gap-4 lg:grid-cols-3 lg:gap-8">
          {pricingPlans?.map((plan, index) => (
            <Card
              key={index}
              className="flex flex-col justify-start bg-white w-full gap-2 px-4 pt-6 pb-8"
              shadow="lg"
            >
              <div
                className={`flex gap-4 max-w-fit px-6 py-2 rounded-md bg-gray-200/50`}
              >
                <Text className="text-major text-black text-xl">
                  {plan.title}
                </Text>
              </div>
              <div className="flex flex-row items-end justify-start w-full gap-2 my-2">
                <Text className="text-major text-black text-3xl md:text-5xl">
                  {`$${plan.price}` || "0"}
                </Text>
                <Text className="text-body font-semibold text-gray-300 text-lg md:text-2xl">
                  /monthly
                </Text>
              </div>
              <div className="flex flex-col items-start justify-start gap-0 my-2 mb-4 lg:mb-24">
                {plan.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="flex flex-row items-center justify-start gap-0"
                  >
                    <PiMatterIcon className="text-3xl text-black" />
                    <Text className="text-body text-black text-lg">
                      {feature}
                    </Text>
                  </span>
                ))}
              </div>
              <Button className="primary-button bg-gray-50 mt-auto mb-0">
                <Text className="text-body text-black text-lg">
                  Get Started
                </Text>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PricingSectionLayout>
  );
};
