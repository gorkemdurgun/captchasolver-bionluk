import { PricingSection } from "@/components";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center w-full h-full gap-4 !bg-white">
      <PricingSection layoutClassName="bg-gradient-to-t from-white via-rose-400 to-white !pt-0" />
    </div>
  );
}
