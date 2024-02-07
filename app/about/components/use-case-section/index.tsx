"use client";

import { lotties, svg } from "@/public/assets";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  PiRocketLaunchDuotone,
  PiSmileyDuotone,
  PiShieldCheckDuotone,
  PiCheckCircleDuotone
} from "react-icons/pi";
import Text from "../../../../components/text";

import { useLottie } from "lottie-react";
import LaunchSectionLayout from "./layout";

const features = [
  {
    icon: PiRocketLaunchDuotone,
    title: "Fast and reliable",
    description: "Our API is fast and reliable, with a high success rate."
  },
  {
    icon: PiSmileyDuotone,
    title: "Easy to use",
    description: "Our API is easy to use and integrate into your projects."
  },
  {
    icon: PiShieldCheckDuotone,
    title: "Secure",
    description: "Your data is safe and secure with our API."
  },
  {
    icon: PiCheckCircleDuotone,
    title: "High success rate",
    description:
      "Our API has a high success rate for solving Recaptcha systems."
  }
];

export const UseCaseSection = () => {
  const options = {
    animationData: lotties.RedRobotLottie,
    loop: true,
    autoplay: true
  };

  const { View: RedRobotLottieAnimation } = useLottie(options);

  return (
    <LaunchSectionLayout>
      <div className="grid grid-cols-2 items-center w-full gap-4 py-8 px-6 md:py-10">
        <Text className="font-protest text-red-700 lg:text-5xl md:text-4xl">
          USE CASES
        </Text>
      </div>
    </LaunchSectionLayout>
  );
};
