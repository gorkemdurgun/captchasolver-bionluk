"use client";

import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useState } from "react";
// import { LuArrowUpDown as ExpandIcon } from "react-icons/lu";
import { FaChevronDown as ExpandIcon } from "react-icons/fa6";

export default function DocsPage() {
  const initialPages: {
    title: string;
    subItems: {
      title: string;
      content: string;
    }[];
  }[] = [
    {
      title: "Getting Started",
      subItems: [
        {
          title: "Introduction",
          content:
            "<p>Please select a <span style='color: red'>page</span> and sub page for <strong>editing</strong></p>"
        },
        {
          title: "Installation",
          content:
            "<b>Installation</b> <p>Some installation</p> <h3>Heading</h3> <strong>Strong</strong>"
        },
        {
          title: "Configuration",
          content: "<p>Configuration</p> <h5>Some configuration</h5>"
        }
      ]
    },
    {
      title: "Customization",
      subItems: [
        {
          title: "Themes",
          content: "<p>Themes</p>"
        },
        {
          title: "Components",
          content: "<p>Components</p>"
        }
      ]
    }
  ];

  function htmlParser(html: string) {
    return { __html: html };
  }

  const [activePage, setActivePage] = useState<string>("0_0");

  const Sidebar = () => (
    <div className="w-1/4 h-full min-h-[100vh] p-4 bg-gray-300">
      {initialPages.map((page, index) => (
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
              content: "py-0"
            }}
            indicator={
              <ExpandIcon className="text-gray-900 w-4 h-4 rotate-90" />
            }
          >
            {page.subItems.map((subItem, subIndex) => (
              <Button
                aria-checked={activePage === `${index}_${subIndex}`}
                key={index}
                className="w-full flex justify-start bg-transparent aria-checked:bg-gray-200"
                onClick={() => setActivePage(`${index}_${subIndex}`)}
              >
                <span className="text-body text-md text-gray-900">
                  {subItem.title}
                </span>
              </Button>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-3/4 h-full p-4 bg-white">
        <div
          dangerouslySetInnerHTML={htmlParser(
            initialPages[parseInt(activePage.split("_")[0])].subItems[
              parseInt(activePage.split("_")[1])
            ].content
          )}
        />
      </div>
    </div>
  );
}
