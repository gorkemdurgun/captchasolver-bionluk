import { Button, Card } from "@nextui-org/react";
import Text from "../text";
import BlogSectionLayout from "./layout";

import { PiDotDuotone as PiMatterIcon } from "react-icons/pi";

export const BlogSection = () => {
  return (
    <BlogSectionLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10">
        <Text className="text-major text-black text-3xl md:text-5xl">
          BLOG POSTS
        </Text>
      </div>
    </BlogSectionLayout>
  );
};
