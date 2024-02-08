import { LaunchSection, UseCaseSection } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <LaunchSection />
      <UseCaseSection />
    </div>
  );
}
