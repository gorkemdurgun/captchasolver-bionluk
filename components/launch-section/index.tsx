"use client";

import { lotties, svg } from "@/public/assets";

import { Button, Card, Divider } from "@nextui-org/react";
import Image from "next/image";
import {
  PiRocketLaunchDuotone,
  PiSmileyDuotone,
  PiShieldCheckDuotone,
  PiCheckCircleDuotone,
  PiRocketDuotone as PiRocket
} from "react-icons/pi";
import Text from "../text";

import { LottieOptions, useLottie } from "lottie-react";
import LaunchSectionLayout from "./layout";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  const options: LottieOptions = {
    animationData: lotties.SolvePuzzleLottie,
    loop: true,
    autoplay: true
  };

  const { View: SolvePuzzleLottieAnimation } = useLottie(options);

  const scrollTo = (elementId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(elementId);
      if (element) {
        if (elementId === "landing-hero-section") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          if (elementId !== "landing-hero-section") {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 300);
    }
  };

  return (
    <LaunchSectionLayout>
      {/* Title */}
      <div
        id="landing-hero-section"
        className="flex flex-col items-center justify-center mt-4 md:mt-0 mx-4 gap-0 p-4 bg-red-300/50 rounded-xl"
      >
        <Text className="text-major text-red-700 text-3xl  lg:text-5xl md:text-4xl">
          Solve automation for
        </Text>
        <Text className="text-major text-red-700 text-3xl lg:text-6xl md:text-4xl">
          Recaptcha systems
        </Text>
      </div>
      <div className="grid grid-cols-1 items-center w-full mt-4 gap-4 mb-4 py-2 md:py-2 px-6 md:p-8 md:grid-cols-[4fr,3fr] ">
        <div className="flex flex-col lg:items-start items-center justify-center gap-4 order-2 md:order-1">
          {/* Description */}
          <Text className="text-body font-Xsemibold text-black text-justify text-md mb-2 max-w-[500px] md:text-xl mt-2 mb-4">
            We provide a simple and easy-to-use API to solve Recaptcha systems
            with a high success rate. Can be integrated into any project with
            ease. Get started with our free plan today!
          </Text>
          {/* Buttons */}
          <div className="flex flex-col items-center justify-start gap-4 mt-4 w-full max-w-[500px]">
            <Button
              className="primary-button bg-red-400 hover:bg-red-600 w-full"
              onClick={() => scrollTo("landing-pricing-section")}
            >
              <Text className="font-body text-white text-lg font-semibold">
                Get started with free trial
              </Text>
            </Button>
            <Button
              className="primary-button bg-white hover:bg-gray-100 w-full"
              onClick={() => router.push("/docs")}
            >
              <Text className="font-body text-gray-800 text-lg font-bold">
                Learn more about our API
              </Text>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 order-1">
          <div className="h-full xl:scale-105">
            {SolvePuzzleLottieAnimation}
          </div>
        </div>
      </div>
      <div className="grid items-center justify-center gap-4 py-2 px-6 w-full lg:grid-cols-4 md:grid-cols-2">
        {features?.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className={`
              flex flex-col
               items-center justify-center gap-1 w-full lg:max-w-[300px] max-w-full p-4 bg-red-200/50 shadow-lg rounded-sm`}
            >
              <Icon className="text-red-700 text-4xl" />
              <Text className="text-major text-red-700 text-xl font-bold">
                {feature.title}
              </Text>
              <Text className="text-body text-gray-900 text-md text-center">
                {feature.description}
              </Text>
            </Card>
          );
        })}
      </div>
    </LaunchSectionLayout>
  );
};
