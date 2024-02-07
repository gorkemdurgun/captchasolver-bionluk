import { PiRocketLaunchDuotone } from "react-icons/pi";

import { Button } from "@nextui-org/react";
import { LaunchSection } from "./components/launch-section";
import { UseCaseSection } from "./components/use-case-section";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <LaunchSection />
      <UseCaseSection />
    </div>
  );
}
