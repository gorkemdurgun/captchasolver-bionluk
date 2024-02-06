import { title } from "@/components/primitives";
import { fontArchivo, fontMono } from "@/config/fonts";

import { PiRocketLaunchDuotone } from "react-icons/pi";

import { Button } from "@nextui-org/react";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button className={"h-100"}>
        <span
          className={title({
            fontFamily: "archivo"
          })}
        >
          Hello, world!
        </span>
      </Button>
      <PiRocketLaunchDuotone className="text-8xl text-violet-400" />
    </div>
  );
}
