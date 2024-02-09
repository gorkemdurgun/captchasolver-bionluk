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
import Text from "../text";

import { LottieOptions, useLottie } from "lottie-react";
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

export const LaunchSection = () => {
  const options: LottieOptions = {
    animationData: lotties.SolvePuzzleLottie,
    loop: true,
    autoplay: true
  };

  const { View: SolvePuzzleLottieAnimation } = useLottie(options);

  return (
    <LaunchSectionLayout>
      <div className="grid grid-cols-1 items-center w-full gap-4 py-8 px-6 md:grid-cols-2 md:py-10">
        <div className="flex flex-col items-start justify-center gap-4 order-2 md:order-1">
          {/* Title */}
          <span className="flex flex-col items-start justify-center gap-0">
            <Text className="text-major text-red-700 text-3xl lg:text-5xl md:text-4xl">
              Solve automation for
            </Text>
            <Text className="text-major text-red-700 text-3xl lg:text-6xl md:text-4xl">
              Recaptcha systems
            </Text>
          </span>
          {/* Description */}
          <Text className="text-body font-medium text-gray-800 text-sm mb-2 md:text-lg mt-2 mb-4">
            We provide a simple and easy-to-use API to solve Recaptcha systems
            with a high success rate. Get started with our free plan today!
          </Text>
          {/* Features */}
          <div className="grid grid-cols-1 gap-2 items-start justify-center lg:grid-cols-2 lg:gap-4">
            {features.map((feature, index) => (
              <span
                key={index}
                className="flex flex-row items-center justify-start gap-2"
              >
                <feature.icon className="text-lg text-red-700 md:text-2xl" />
                <Text className="font-body text-gray-800 font-medium md:text-xl">
                  {feature.title}
                </Text>
              </span>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex flex-row items-center justify-start gap-4 mt-4">
            <Button className="primary-button bg-red-400 hover:bg-red-600">
              <Text className="font-body text-white text-lg font-bold">
                Get Started
              </Text>
            </Button>
            <Button className="primary-button bg-white hover:bg-gray-100">
              <Text className="font-body text-gray-800 text-lg font-bold">
                Learn More
              </Text>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 order-1">
          <div className="h-full xl:scale-125">
            {SolvePuzzleLottieAnimation}
          </div>
        </div>
      </div>
    </LaunchSectionLayout>
  );
};
