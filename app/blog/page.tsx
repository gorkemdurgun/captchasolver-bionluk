"use client";

import { mockBlogPosts } from "@/mocks/blogs";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  ScrollShadow
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { LuArrowUpDown as ExpandIcon } from "react-icons/lu";
import { FaChevronRight as ReadIcon } from "react-icons/fa6";
import { PiDotDuotone as ActivePageIcon } from "react-icons/pi";

export default function BlogPage() {
  function htmlParser(html: string) {
    return { __html: html };
  }

  const pathname = usePathname();
  const blogId = pathname.split("/")[2];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog>(mockBlogPosts[0]);

  function colorGeneratorByFirstLetter(str: string) {
    const colors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500"
    ];
    const firstLetter = str[0].toLowerCase();
    const index = firstLetter.charCodeAt(0) - 97;
    return colors[index % colors.length];
  }

  return (
    <div className="max-w-7xl relative overflow-hidden w-full h-full flex flex-col items-center">
      <div className="relative overflow-hidden w-full h-full flex gap-4">
        <div className="sticky top-0 w-1/4 h-auto flex-col gap-2 p-4 md:flex hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-major text-3xl text-black">Blog</h1>
            <span className="text-md text-gray-800">
              All blog posts ({mockBlogPosts.length})
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-md font-bold text-black">Tags</span>
            <div className="flex flex-wrap gap-2">
              {mockBlogPosts
                .flatMap(blog => blog.tags)
                .filter((tag, index, self) => self.indexOf(tag) === index)
                .map((tag, index) => (
                  <Button
                    size="sm"
                    key={index}
                    className={`py-1 px-2 bg-transparent border-2 ${
                      selectedTags.includes(tag)
                        ? "border-black"
                        : "border-gray-300"
                    } text-black`}
                    onClick={() =>
                      setSelectedTags(
                        selectedTags.includes(tag)
                          ? selectedTags.filter(
                              selectedTag => selectedTag !== tag
                            )
                          : [...selectedTags, tag]
                      )
                    }
                  >
                    #{tag}
                  </Button>
                ))}
            </div>
          </div>
          <ScrollShadow
            className="h-full w-full mt-2 p-2 rounded-md bg-white border border-gray-200"
            hideScrollBar
            visibility={"both"}
          >
            <div className="flex flex-col items-start gap-3 overflow-auto scroll-smooth">
              {mockBlogPosts
                .filter(blog =>
                  selectedTags.every(tag => blog.tags.includes(tag))
                )
                .map((page, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between w-full p-2 border-b border-gray-200
                    rounded-md cursor-pointer transition-all hover:bg-gray-100 "
                    onClick={() => setSelectedBlog(page)}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-md text-gray-800">
                        {page.title}
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {page.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`text-[10px] text-white p-1 rounded-md ${colorGeneratorByFirstLetter(
                              tag
                            )}`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </span>
                    </div>
                    <ReadIcon className="text-md text-gray-300" />
                  </div>
                ))}
            </div>
          </ScrollShadow>
        </div>
        <div className="w-full md:w-3/4 min-h-[100vh] max-h-[150vh] overflow-auto flex flex-col gap-4 p-4 pb-24 text-black">
          <div className="flex items-center gap-2">
            <ActivePageIcon className="text-2xl text-gray-500" />
            <span className="text-lg font-bold">{selectedBlog?.title}</span>
          </div>
          <Image
            src={selectedBlog?.imageUrl || ""}
            alt={selectedBlog?.title}
            width={800}
            height={400}
            className="rounded-md"
          />
          <div className="flex flex-wrap gap-2">
            {selectedBlog?.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-[10px] text-white p-1 rounded-md ${colorGeneratorByFirstLetter(
                  tag
                )}`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-black">
              {selectedBlog?.title}
            </h1>
            <div
              dangerouslySetInnerHTML={htmlParser(selectedBlog?.content || "")}
            />
          </div>
          <div className="flex md:hidden flex-wrap gap-4 mt-auto pt-12">
            <h1 className="text-md font-bold text-black">Read more posts</h1>
            <div className="flex flex-wrap gap-2">
              {mockBlogPosts
                .filter(blog => blog.id !== selectedBlog?.id)
                .map((blog, index) => (
                  <Button
                    key={index}
                    size="sm"
                    className="py-1 px-2 bg-transparent border-2 border-gray-300 text-black"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    {blog.title}
                  </Button>
                ))}
              <Button
                size="sm"
                className="py-1 px-2 bg-transparent border-2 border-gray-300 text-black"
                onClick={() => setSelectedBlog(mockBlogPosts[0])}
              >
                Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
