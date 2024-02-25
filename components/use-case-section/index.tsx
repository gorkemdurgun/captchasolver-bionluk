"use client";

import { lotties, svg } from "@/public/assets";

import { Button, Card, Divider, Snippet, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import {
  PiRocketLaunchDuotone,
  PiSmileyDuotone,
  PiShieldCheckDuotone,
  PiCheckCircleDuotone
} from "react-icons/pi";

import { useLottie } from "lottie-react";
import UseCasesSectionLayout from "./layout";
import Text from "@/components/text";

const pythonCodeSteps = [
  {
    title: "Install the package",
    snippet: "pip install captcha-solver"
  },
  {
    title: "Import the package",
    snippet: "from captcha_solver import Capsmasher"
  },
  {
    title: "Create a solver instance",
    snippet: "solver = Capsmasher()"
  },
  {
    title: "Solve a captcha",
    snippet: "solver.solve_captcha('path/to/captcha.png')"
  }
];

const goCodeSteps = [
  {
    title: "Install the package",
    snippet: "go get github.com/captcha-solver"
  },
  {
    title: "Import the package",
    snippet: "import captcha-solver"
  },
  {
    title: "Create a solver instance",
    snippet: "solver := captcha-solver.New()"
  },
  {
    title: "Solve a captcha",
    snippet: "solver.SolveCaptcha('path/to/captcha.png')"
  }
];

export const UseCaseSection = () => {
  return (
    <UseCasesSectionLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <Text className="text-major text-black text-3xl md:text-5xl">
            HOW TO USE API ?
          </Text>
        </span>
        <Text className="text-body text-black text-md text-center lg:text-xl">
          This is a simple guide to get you started with Capsmasher. You can use
          it with Python and Go. For more information, check the documentation.
          You can also check the examples in the repository to see how to use it
          with other languages.
        </Text>
        <Divider className="none w-full lg:my-4" />
        <Card className="bg-white w-full px-4 py-8 my-8" shadow="lg">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-start justify-between gap-4">
              <span className="flex flex-col items-start justify-start gap-2">
                <Text className="text-body text-black text-lg font-bold">
                  How to use Capsmasher?
                </Text>
                <Text className="text-major text-black text-3xl">
                  Use Capsmasher to solve Recaptcha systems
                </Text>
              </span>
              <span className="flex flex-col items-start justify-start gap-2">
                <Text className="text-body text-black text-md">
                  Capsmasher is a simple and easy-to-use API to solve Recaptcha
                  systems. You can use it with Python and Go. This is a simple
                  guide to get you started.
                </Text>
                <Text className="text-body text-black text-md">
                  For more information, check the documentation. You can also
                  check the examples in the repository to see how to use it with
                  other languages. If you have any questions, feel free to reach
                  out to us. We are happy to help you.
                </Text>
                <Text className="text-body text-black text-md">
                  Do you need help with something else? Check the documentation
                  or reach out to us. We are happy to help you.
                </Text>
              </span>
              <div className="flex flex-row items-center justify-start gap-4 w-full">
                <Button className="primary-button bg-gray-50 w-full hover:bg-gray-100">
                  <Text className="font-body text-black text-lg font-bold">
                    Read the Docs
                  </Text>
                </Button>
              </div>
            </div>
            <div className="hidden flex-col items-center justify-center gap-4 lg:flex">
              <Card
                isBlurred
                className=" border-none rounded-md w-full p-4 dark:bg-gray-700/50"
                shadow="sm"
              >
                <Tabs aria-label="Options">
                  <Tab key="python" title="Python">
                    <Card className="bg-white w-full p-4 my-4 gap-4">
                      {pythonCodeSteps.map((step, index) => (
                        <span
                          key={index}
                          className="flex flex-col items-start justify-start gap-1"
                        >
                          <Text className="text-body text-black text-xs font-bold lg:text-sm">
                            {`${index + 1}. ${step.title}`}
                          </Text>
                          <Snippet className="text-body text-black text-xs bg-gray-200 lg:text-xs">
                            {step.snippet}
                          </Snippet>
                        </span>
                      ))}
                    </Card>
                  </Tab>
                  <Tab key="Go" title="Go">
                    <Card className="bg-white w-full p-4 my-4 gap-4">
                      {goCodeSteps.map((step, index) => (
                        <span
                          key={index}
                          className="flex flex-col items-start justify-start gap-1"
                        >
                          <Text className="text-body text-black text-sm font-bold">
                            {`${index + 1}. ${step.title}`}
                          </Text>
                          <Snippet className="text-body text-black text-sm bg-gray-200">
                            {step.snippet}
                          </Snippet>
                        </span>
                      ))}
                    </Card>
                  </Tab>
                </Tabs>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </UseCasesSectionLayout>
  );
};
