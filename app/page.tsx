import {
  BlogSection,
  LaunchSection,
  PricingSection,
  UseCaseSection,
  ContactSection
} from "@/components";
import { Divider } from "@nextui-org/react";
export const dynamic = "force-dynamic";

export default function Home() {
  // isDark default false
  const CustomDivider = () => {
    return (
      <div
        className={`w-full h-px bg-gradient-to-r from-white via-black to-white`}
      />
    );
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <LaunchSection />
      <CustomDivider />
      <UseCaseSection />
      <CustomDivider />
      <BlogSection />
      <CustomDivider />
      <PricingSection />
      <CustomDivider />
      <ContactSection />
    </div>
  );
}
