import { Progress } from "@nextui-org/react";
import Image from "next/image";

export const LoadingStore = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="flex items-center justify-center p-8 bg-red-200 rounded-[40px] shadow-lg">
        <Image
          className="animate-bounce"
          src="/assets/images/logo.svg"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
