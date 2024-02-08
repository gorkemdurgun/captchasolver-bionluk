import { LaunchSection, UseCaseSection } from "@/components";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <LaunchSection />
      <Divider />
      <UseCaseSection />
    </div>
  );
}
