"use client";
import Image from "next/image";
import LoginLayout from "./layout";
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

const styles = {
  label: "text-black/50 dark:text-white/90"
};

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className="grid items-center w-full gap-4 px-6 ">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p className="text-major flex justify-center text-black text-3xl md:text-5xl">
            LOGIN
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
            <Link
              href="/forgot-password"
              className="flex justify-end w-9/12 text-body font-medium text-white text-md my-2 "
            >
              Forgot password
            </Link>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col justify-center items-center bg-gray-700">
            <Button className="primary-button w-9/12 flex justify-center bg-red-400 hover:bg-red-600 mb-4">
              <Text className="font-body text-white text-lg font-bold">
                Login
              </Text>
            </Button>
            <span>
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-body font-medium text-red-300 text-md m-2 underline"
              >
                Sign Up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </LoginLayout>
  );
}
