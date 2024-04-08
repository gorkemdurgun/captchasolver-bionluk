"use client";

import { getDocumentations } from "@/services/docs";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { LuArrowUpDown as ExpandIcon } from "react-icons/lu";
import { FaChevronDown as ExpandIcon } from "react-icons/fa6";
import { PiDotDuotone as ActivePageIcon } from "react-icons/pi";

export default function DocsPage() {
  function htmlParser(html: string) {
    return { __html: html };
  }

  const params = useSearchParams();

  const [activePage, setActivePage] = useState<string>("0_0");
  const [docTrees, setDocTrees] = useState<Documentation[]>([]);

  useEffect(() => {
    if (params.has("category")) {
      setActivePage(params.get("category") as string);
    }
  }, [params]);

  useEffect(() => {
    getDocumentations().then(({ data }) => {
      setDocTrees(data.documentations);
    });
  }, []);

  return (
    <div className="max-w-7xl relative overflow-hidden w-full h-full flex">
      <div className="relative overflow-hidden w-full h-full flex flex-col lg:flex-row">
        <Dropdown className="flex lg:hidden" title="Select a category">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="flex lg:hidden m-4 text-gray-900"
            >
              {docTrees[parseInt(activePage.split("_")[0])]?.title + " - " +
                docTrees[parseInt(activePage.split("_")[0])]?.subItems[
                  parseInt(activePage.split("_")[1])
                ].title}
              <ExpandIcon className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded">
            {docTrees.map((page, index) => (
              <DropdownSection
                key={index}
                title={page.title}
                className="justify-between text-start"
              >
                {page.subItems.map((subItem, subIndex) => (
                  <DropdownItem
                    key={subIndex}
                    onClick={() => setActivePage(`${index}_${subIndex}`)}
                  >
                    {subItem.title}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="hidden lg:flex flex-col sticky top-0 w-1/4 h-auto overflow-auto scroll-smooth p-4 border-l border-gray-100 bg-white drop-shadow-2xl">
          <h1 className="text-major text-3xl text-black">Documentation</h1>
          {docTrees.map((page, index) => (
            <Accordion
              defaultExpandedKeys="all"
              key={index}
              itemClasses={{
                titleWrapper: "text-major font-normal",
                title: "text-gray-900"
              }}
            >
              <AccordionItem
                key={index}
                title={page.title}
                classNames={{
                  base: "p-0",
                  titleWrapper: "pl-2 text-major font-light",
                  indicator: "mr-4",
                  content: "py-0"
                }}
                indicator={
                  <ExpandIcon className="text-gray-800 w-4 h-4 rotate-90" />
                }
              >
                {page.subItems.map((subItem, subIndex) => (
                  <Button
                    aria-checked={activePage === `${index}_${subIndex}`}
                    key={index}
                    className="w-full flex justify-between pr-2 bg-transparent aria-checked:bg-red-100/50"
                    onClick={() => setActivePage(`${index}_${subIndex}`)}
                  >
                    <span className="text-body text-md text-gray-900">
                      {subItem.title}
                    </span>
                    {activePage === `${index}_${subIndex}` && (
                      <ActivePageIcon className="w-8 h-8 text-red-500" />
                    )}
                  </Button>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="w-full sm:w-3/4 min-h-[100vh] max-h-[150vh] overflow-auto p-4 bg-white text-black">
          <div
            dangerouslySetInnerHTML={htmlParser(
              docTrees[parseInt(activePage.split("_")[0])]?.subItems[
                parseInt(activePage.split("_")[1])
              ].content
            )}
          />
        </div>
      </div>
    </div>
  );
}
