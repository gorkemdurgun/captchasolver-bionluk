"use client";
import Image from "next/image";
import RegisterLayout from "./layout";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input
} from "@nextui-org/react";
import { svg } from "@/public/assets";
import Text from "@/components/text";
import Link from "next/link";
import {
  PiArrowBendDoubleUpLeftBold,
  PiArrowBendDoubleUpLeftFill
} from "react-icons/pi";

const styles = {
  label: "text-black/50 dark:text-white/90"
};

export default function LoginPage() {
  return (
    <RegisterLayout>
      <div className="grid items-center w-full gap-4 px-6 ">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p className="text-major flex justify-center text-black text-3xl md:text-5xl">
            Register
          </p>
        </span>
        <Divider />
        <Card className="mt-7">
          <CardHeader className="flex gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={svg.Logo}
                alt="CAPTCHASOLVER LOGO"
                width={40}
                height={40}
              />
              <p className="font-bold text-inherit">CAPTCHASOLVER</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center bg-gray-800">
            <Input
              className="w-9/12 py-4"
              type="text"
              label="Full Name"
              classNames={styles}
              labelPlacement="inside"
            ></Input>
            <Input
              className="w-9/12 py-4"
              type="email"
              label="Email"
              isRequired
              classNames={styles}
              labelPlacement="inside"
            ></Input>
            <Input
              className="w-9/12 py-4"
              type="password"
              label="Password"
              isRequired
              classNames={styles}
              labelPlacement="inside"
            ></Input>
            <Input
              className="w-9/12 py-4"
              type="password"
              label="Confirm Password"
              isRequired
              classNames={styles}
              labelPlacement="inside"
            ></Input>
            <div className="w-9/12 flex flex-row items-center ">
              <PiArrowBendDoubleUpLeftBold className="mr-2" />
              <Link
                href="/login"
                className="flex justify-start w-9/12 text-body font-medium text-white text-md my-2 "
              >
                Back to Login
              </Link>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col justify-center items-center bg-gray-700">
            <Button className="primary-button w-9/12 flex justify-center bg-red-400 hover:bg-red-600 mb-4">
              <Text className="font-body text-white text-lg font-bold">
                Sign Up
              </Text>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </RegisterLayout>
  );
}
