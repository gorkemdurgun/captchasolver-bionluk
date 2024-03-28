"use client";

import Text from "../text";
import BlogSectionLayout from "./layout";

import {
  PiDotDuotone as PiMatterIcon,
  PiCaretDoubleDown as PiArrowDownIcon
} from "react-icons/pi";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Divider
} from "@nextui-org/react";
import { mockBlogPosts } from "@/mocks/blogs";
import { useRouter } from "next/navigation";

export const BlogSection = () => {

  const router = useRouter();

  return (
    <BlogSectionLayout>
      <div
        id="landing-blog-section"
        className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10"
      >
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <Text className="text-major text-black text-3xl md:text-5xl">
            BLOG POSTS
          </Text>
        </span>
        <Text className="text-body text-black text-md text-center lg:text-xl">
          Read our latest blog posts to stay updated with our services and
          products. We share our knowledge and experience to help you grow your
          business. We also share tips and tricks to help you solve captchas.
        </Text>
        <Divider className="w-full my-4" />
        <div className="grid grid-cols-12 grid-rows-2 gap-4 mt-4 w-full">
          {mockBlogPosts.slice(0, 3).map((post, index) => (
            <div
              key={index}
              className="relative cursor-pointer col-span-12 sm:col-span-4 h-[300px] border-4 rounded-3xl transition-all hover:scale-95"
              onClick={() => router.push(`/blog/${post.id}`)}
            >
              <div className="absolute z-10 top-4 left-4">
                <h4 className="text-white font-medium text-large">
                  {post.title}
                </h4>
              </div>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-50"
                src={post.imageUrl}
              />
            </div>
          ))}
          {mockBlogPosts?.slice(3, 5).map((post, index) => (
            <div
              key={index}
              className="relative cursor-pointer col-span-12 sm:col-span-6 h-[300px] border-4 rounded-3xl transition-all hover:scale-95"
              onClick={() => router.push(`/blog/${post.id}`)}
            >
              <div className="absolute z-10 top-4 left-4">
                <h4 className="text-white font-medium text-large">
                  {post.title}
                </h4>
              </div>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-50"
                src={post.imageUrl}
              />
            </div>
          ))}
        </div>
        <Button className="primary-button bg-black mt-4 w-full hover:bg-black lg:min-w-[400px]">
          <Text className="text-body text-white text-lg">Read More</Text>
          <PiArrowDownIcon className="text-white text-xl" />
        </Button>
      </div>
    </BlogSectionLayout>
  );
};
