"use client";

import { lotties, svg } from "@/public/assets";

import { Button, Card, Snippet, Tab, Tabs } from "@nextui-org/react";
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
    snippet: "from captcha_solver import CaptchaSolver"
  },
  {
    title: "Create a solver instance",
    snippet: "solver = CaptchaSolver()"
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
        <Text className="text-major text-black text-3xl md:text-5xl">
          HOW TO USE API ?
        </Text>
        <Card
          className="border-2 border-black bg-white w-full px-4 py-8 my-8"
          shadow="lg"
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-start justify-between gap-4">
              <span className="flex flex-col items-start justify-start gap-2">
                <Text className="text-body text-black text-lg font-bold">
                  How to use CaptchaSolver?
                </Text>
                <Text className="text-major text-black text-3xl">
                  Use CaptchaSolver to solve Recaptcha systems
                </Text>
              </span>
              <span className="flex flex-col items-start justify-start gap-2">
                <Text className="text-body text-black text-md">
                  CaptchaSolver is a simple and easy-to-use API to solve
                  Recaptcha systems. You can use it with Python and Go. This is
                  a simple guide to get you started.
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
                <Button className="primary-button bg-transparent w-full hover:bg-gray-100">
                  <Text className="font-body text-black text-lg font-bold">
                    Read the Docs
                  </Text>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Card
                isBlurred
                className="border-none rounded-md w-full p-4 dark:bg-gray-700/50"
                shadow="sm"
              >
                <Tabs aria-label="Options">
                  <Tab key="python" title="Python">
                    <Card className="border-2 border-black bg-white w-full p-4 my-4 gap-4">
                      {pythonCodeSteps.map((step, index) => (
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
                  <Tab key="Go" title="Go">
                    <Card className="border-2 border-black bg-white w-full p-4 my-4 gap-4">
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
