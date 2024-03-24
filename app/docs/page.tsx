"use client";

import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { LuArrowUpDown as ExpandIcon } from "react-icons/lu";
import { FaChevronDown as ExpandIcon } from "react-icons/fa6";
import { PiDotDuotone as ActivePageIcon } from "react-icons/pi";

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
          content:
            "<p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p>  <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p>  <br/> <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p><p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p>  <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p>  <br/> <p>Configuration</p> <h5>Some configuration</h5> <p>Some configuration</p> <h5>Some configuration</h5> <p>Some configuration</p>"
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
    },
    {
      title: "Advanced",
      subItems: [
        {
          title: "API",
          content: "<p>API</p>"
        },
        {
          title: "Plugins",
          content: "<p>Plugins</p>"
        }
      ]
    },
    {
      title: "Examples",
      subItems: [
        {
          title: "Basic",
          content: "<p>Basic</p>"
        },
        {
          title: "Advanced",
          content: "<p>Advanced</p>"
        }
      ]
    },
    {
      title: "FAQ",
      subItems: [
        {
          title: "General",
          content: "<p>General</p>"
        },
        {
          title: "Technical",
          content: "<p>Technical</p>"
        }
      ]
    },
    {
      title: "Changelog",
      subItems: [
        {
          title: "v1.0.0",
          content: "<p>v1.0.0</p>"
        },
        {
          title: "v1.1.0",
          content: "<p>v1.1.0</p>"
        }
      ]
    }
  ];

  function htmlParser(html: string) {
    return { __html: html };
  }

  const params = useSearchParams();

  const [activePage, setActivePage] = useState<string>("0_0");

  useEffect(() => {
    if (params.has("category")) {
      setActivePage(params.get("category") as string);
    }
  }, [params]);

  return (
    <div className="relative overflow-hidden w-full h-full flex">
      <div className="sticky top-0 w-1/4 h-[87.5vh] overflow-scroll scroll-smooth p-4 bg-gradient-to-l from-gray-100 via-gray-200 to-white">
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
                  className="w-full flex justify-between bg-transparent aria-checked:bg-red-100/50"
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
      <div className="w-3/4 h-[87.5vh] overflow-scroll p-4 bg-white text-black">
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
