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
  Input,
  InputSlots,
  SlotsToClasses
} from "@nextui-org/react";
import { svg } from "@/public/assets";
import Text from "@/components/text";
import Link from "next/link";

import { PiArrowBendDoubleUpLeftBold as BackLoginIcon } from "react-icons/pi";

const styles: SlotsToClasses<InputSlots> = {
  label: "text-white text-lg whitespace-nowrap",
  input: "!text-black",
  inputWrapper: "max-w-lg !bg-white text-body",
  mainWrapper: "w-full"
};

export default function RegisterPage() {
  return (
    <RegisterLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 px-6 ">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p className="text-major flex justify-center text-black text-3xl md:text-5xl">
            REGISTER
          </p>
        </span>
        <Divider />
        <Card className="flex items-center w-full max-w-4xl bg-gray-800">
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
          <CardBody className="flex items-center gap-4 py-12 w-full max-w-xl">
            <Input
              className="grid grid-cols-[1fr,2fr]"
              type="name"
              label="Fullname"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              type="email"
              label="Email"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              type="password"
              label="Password"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              type="password"
              label="Confirm Password"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <Button className="primary-button  w-full bg-red-400 hover:bg-red-600">
              <Text className="font-body text-white text-lg font-bold">
                Sign Up
              </Text>
            </Button>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col justify-center items-center gap-4 bg-gray-700">
            <span>
              Already have an account?
              <Link
                href="/login"
                className="text-body font-medium text-red-300 text-md m-2 underline"
              >
                Login
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </RegisterLayout>
  );
}
