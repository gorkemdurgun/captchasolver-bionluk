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

import { useLottie } from "lottie-react";
import UseCasesSectionLayout from "./layout";
import Text from "@/components/text";

export const UseCaseSection = () => {
  return (
    <UseCasesSectionLayout>
      <div className="grid grid-cols-2 items-center w-full gap-4 py-8 px-6 md:py-10">
        <Text className="font-protest text-red-700 text-3xl md:text-5xl">
          USE CASES
        </Text>
      </div>
    </UseCasesSectionLayout>
  );
};
